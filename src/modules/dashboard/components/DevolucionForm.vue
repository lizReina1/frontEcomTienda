<template>
    <div id="DevolucionForm">
        <div class="row justify-content-center">
            <h4><b>{{ isEditing ? 'Editar Devolución' : 'Crear Devolución' }}</b></h4>
        </div>
        <div class="row">
            <!-- Formulario para crear la devolución -->
            <form @submit.prevent="submitRefundFromModal" class="create-refund-form">
                <div class="form-group">
                    <label for="cliente" class="bold-label">Cliente</label>
                    <select v-model="localRefund.cliente" class="form-control" id="cliente" required>
                        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.name }}
                        </option>
                    </select>
                </div>
                <div class="form-group mt-3">
                    <div class="row">
                        <div class="col">
                            <button type="button" @click="fetchSales" class="btn btn-primary w-100">Buscar
                                Ventas</button>
                        </div>
                        <div class="col">
                            <button @click.prevent="cancelarOperacion" class="btn btn-secondary w-100">Cancelar</button>
                        </div>
                    </div>
                </div>
            </form>
            <div class="row">
                <h4 class="mt-4">Ventas del Cliente</h4>
                <table v-if="sales.length > 0" class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Tipo de Pago</th>
                            <th>Detalles</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="sale in sales" :key="sale.id">
                            <td>{{ sale.id }}</td>
                            <td>{{ sale.date }}</td>
                            <td>{{ sale.total }}</td>
                            <td>{{ sale.payment_type }}</td>
                            <td>
                                <ul>
                                    <li v-for="detail in sale.details" :key="detail.product_id">
                                        Producto: {{ detail.product_name }} - Cantidad: {{ detail.quantity }}
                                    </li>
                                </ul>
                            </td>
                            <td>
                                <button @click="selectSale(sale)" class="btn btn-sm btn-success">Seleccionar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-else class="mt-4">
                    No hay ventas para mostrar.
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h4 class="mb-3">Detalles de la Venta</h4>
                <div v-if="selectedSale">
                    <p>ID: {{ selectedSale.id }}</p>
                    <p>Fecha: {{ selectedSale.date }}</p>
                    <p>Total: {{ selectedSale.total }}</p>
                    <p>Tipo de Pago: {{ selectedSale.payment_type }}</p>
                    <div class="form-group">
                        <label for="detalleVenta">Seleccionar Detalle</label>
                        <select v-model="selectedDetailId" id="detalleVenta" class="form-control">
                            <option v-for="detail in selectedSale.details" :key="detail.product_id" :value="detail.id">
                                Producto: {{ detail.product_name }} - Cantidad: {{ detail.quantity }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="refundQuantity">Cantidad</label>
                    <input v-model.number="localRefund.quantity" type="number" id="refundQuantity" class="form-control"
                        min="1">
                </div>
                <div class="form-group">
                    <label for="refundReason">Razón de Devolución</label>
                    <textarea v-model="localRefund.reason" id="refundReason" rows="3" class="form-control"></textarea>
                </div>
                <button @click="submitRefundFromModal" class="btn btn-primary">Crear Devolución</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DevolucionForm',
    props: {
        refund: {
            type: Object,
            default: () => ({
                cliente: '',
                quantity: 1,
                reason: '',
                detail_sale_id: null,
            })
        },
        isEditing: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            localRefund: {
                cliente: this.refund.cliente,
                quantity: this.refund.quantity,
                reason: this.refund.reason,
                detail_sale_id: this.refund.detail_sale_id,
            },
            sales: [],
            clientes: [],
            showModal: false,
            selectedSale: null,
            selectedDetailId: null,
        };
    },
    watch: {
        // Watch for changes in the prop and update the local data accordingly
        refund: {
            handler(newRefund) {
                this.localRefund = { ...newRefund };
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.fetchClientes();
    },
    methods: {
        async fetchClientes() {
            try {
                const response = await axios.post('http://18.218.15.90:8080/graphql', {
                    query: `
                        {
                            customers {
                                id
                                name
                            }
                        }
                    `
                });
                this.clientes = response.data.data.customers;
            } catch (error) {
                console.error('Error al obtener clientes:', error);
            }
        },
        async fetchSales() {
            try {
                const customerId = parseInt(this.localRefund.cliente);
                if (isNaN(customerId)) {
                    console.error('Error: El customerId no es un número entero válido.');
                    return;
                }

                const response = await axios.post('http://18.218.15.90:8080/graphql', {
                    query: `
                        query SalesByCustomer($customerId: Int!) {
                            salesByCustomer(customerId: $customerId) {
                                id
                                date
                                total
                                payment_type
                                details {
                                    id
                                    product_id
                                    quantity
                                    sale_id
                                }
                            }
                        }
                    `,
                    variables: {
                        customerId: customerId
                    }
                });
                console.log('sales customer', response)
                this.sales = await this.mapProductNames(response.data.data.salesByCustomer || []);
            } catch (error) {
                console.error('Error al obtener ventas del cliente:', error);
                this.sales = [];
            }
        },
        async mapProductNames(sales) {
            const productIds = new Set();
            sales.forEach(sale => {
                sale.details.forEach(detail => {
                    productIds.add(detail.product_id);
                });
            });

            const productNames = {};
            for (const id of productIds) {
                productNames[id] = await this.fetchProductoId(id);
            }

            sales.forEach(sale => {
                sale.details.forEach(detail => {
                    detail.product_name = productNames[detail.product_id] || 'Desconocido';
                });
            });

            return sales;
        },
        async fetchProductoId(id) {
            try {
                const response = await axios.post('http://18.218.15.90:8080/graphql', {
                    query: `
                        {
                            product(id: "${id}") {
                                id
                                name
                            }
                        }
                    `
                });
                return response.data.data.product.name;
            } catch (error) {
                console.error('Error al obtener el nombre del producto:', error);
                return 'Desconocido';
            }
        },
        selectSale(sale) {
            this.selectedSale = sale;
            this.showModal = true;
            this.selectedDetailId = sale.details.length > 0 ? sale.details[0].id : null;
        },
        closeModal() {
            this.showModal = false;
            this.selectedSale = null;
            this.selectedDetailId = null;
        },
        async submitRefundFromModal() {
            try {
                if (!this.selectedSale || !this.selectedDetailId) {
                    console.error('Debe seleccionar un detalle para crear la devolución.');
                    return;
                }

                const detail = this.selectedSale.details.find(d => d.id === this.selectedDetailId);
                console.log('detail selected ', this.selectedDetailId, 'detail find', detail)
                if (!detail) {
                    console.error('Detalle seleccionado no encontrado.');
                    return;
                }

                const result = await axios.post('http://18.218.15.90:8080/graphql', {
                    query: `
                        mutation {
                            createRefund(input: {
                                date: "${new Date().toISOString().split('T')[0]}"
                                reason: "${this.localRefund.reason}"
                                quantity: ${this.localRefund.quantity}
                                customer_id: ${this.localRefund.cliente}
                                detail_sale_id: ${this.selectedDetailId}
                            }) {
                                reason
                                quantity
                            }
                        }
                    `,
                });
                console.log('Devolución creada:', result);
                this.$emit('refund-created', result.data.data.createRefund);
                this.resetForm();
                this.closeModal();
            } catch (error) {
                console.error('Error al crear la devolución:', error);
            }
        },
        resetForm() {
            this.localRefund = {
                cliente: '',
                quantity: 1,
                reason: '',
                detail_sale_id: null,
            };
            this.sales = [];
            this.showModal = false;
            this.selectedSale = null;
            this.selectedDetailId = null;
        },
        cancelarOperacion() {
            this.$emit('cancelar'); // Emitir evento cancelar
        },
    }
};
</script>

<style scoped>
.create-refund-form {
    max-width: 500px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 15px;
}

.bold-label {
    font-weight: bold;
}

.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 1050;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 10px;
}

.modal-content {
    background-color: #fefefe;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    padding: 20px;
    max-width: 600px;
    width: 100%;
    z-index: 1100;
    position: relative;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    margin-right: -10px;
    margin-top: -10px;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>

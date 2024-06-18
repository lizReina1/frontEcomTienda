<template>
    <div class="container">
        <h4 class="mt-4"><b>Detalle de Devolución</b></h4>
        <hr>
        <div v-if="refund" class="card">
            <div class="card-body">
                <div class="form-group row">
                    <label for="fecha" class="col-sm-3 col-form-label">Fecha:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="fecha" v-model="refund.date" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="cliente" class="col-sm-3 col-form-label">Cliente:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="cliente" v-model="clienteName" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="cantidad" class="col-sm-3 col-form-label">Cantidad:</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="cantidad" v-model="refund.quantity" disabled>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="razon" class="col-sm-3 col-form-label">Razón de Devolución:</label>
                    <div class="col-sm-9">
                        <textarea class="form-control" id="razon" rows="3" v-model="refund.reason" disabled></textarea>
                    </div>
                </div>
            </div>
            <div class="card-footer text-right">
                <button class="btn btn-secondary" @click="volver">Volver</button>
            </div>
        </div>
        <div v-else class="alert alert-info mt-4">
            No se ha seleccionado ninguna devolución.
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DevolucionDetail',
    props: {
        refund: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            clienteName: ''
        };
    },
    computed: {
        clienteNameComputed() {
            if (this.refund && this.refund.customer_id) {
                return this.getClienteName(this.refund.customer_id);
            }
            return 'Cliente Desconocido';
        }
    },
    methods: {
        async getClienteName(clienteId) {
            try {
                const response = await axios.post('http://18.218.15.90:8080/graphql', {
                    query: `
                        {
                            customer(id: "${clienteId}") {
                                name
                            }
                        }
                    `
                });
                return response.data.data.customer.name;
            } catch (error) {
                console.error('Error al obtener el nombre del cliente:', error);
                return 'Cliente Desconocido';
            }
        },
        volver() {
            this.$emit('cancelar');
        }
    },
    watch: {
        refund: {
            handler(newVal) {
                this.getClienteName(this.refund.customer_id).then(clienteName => {
                    this.clienteName = clienteName;
                });
            },
            immediate: true
        }
    }
};
</script>

<style scoped>
.card {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 20px;
}

.card-footer {
    background-color: #f8f9fa;
    border-top: 1px solid #ddd;
    padding: 10px 20px;
}

.alert {
    margin-top: 20px;
    padding: 15px;
    border-radius: 4px;
}
</style>
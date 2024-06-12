<template>
  <div class="auth-form">
    <div class="Container">
      <div class="card mt-5" style="background-color: #fff !important; border:solid 0px !important;">
        <div class="upper">
          <div class="row">
            <div class="col-8 heading">
              <h4><b>{{ title }}</b></h4>
            </div>
          </div>
          <form @submit.prevent="handleSubmit">
            <div id="alert" class="mt-1" role="alert"></div>
            <slot name="additional-fields"></slot>
            <div class="form-element">
              <span id="input-header">Correo Electronico</span>
              <input type="email" v-model="form.email" placeholder="email@gmail.com">
            </div>
            <div class="form-element">
              <span id="input-header">Password</span>
              <div class="row p-0">
                <div class="d-flex align-items-center">
                  <input type="password" v-model="form.password" placeholder="pass*****">
                  <i class="fas fa-eye-slash eye"></i>
                </div>
              </div>
              <a href="#" class="text-info">¿Olvido su contraseña?</a>
            </div>
            <div class="form-element">
              <div class="row invalid">
                <div class="col-11">
                  <h6 class="text-secondary mb-3 text-center">
                    <p class="mb-0">{{ linkText }}</p>
                    <a :href="linkHref" class="text-info">{{ linkActionText }}</a>
                  </h6>
                </div>
              </div>
            </div>
            <div class="lower">
              <button class="btn btn-warning" type="submit" id="loader">{{ buttonText }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    linkText: {
      type: String,
      required: true
    },
    linkHref: {
      type: String,
      required: true
    },
    linkActionText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        // Aquí no es necesario definir confirmPassword, ya que se usará en el slot
      },
      user: Array,
    };
  },
  methods: {
    handleSubmit() {
        console.log('fetcj', this.user);
        this.fetchUserId(14)
      this.$emit('submit', this.form);
    },
  fetchUserId(id) {
  return axios.post('http://18.218.15.90:8080/graphql', {
    query: `
      {
        user(id: "${id}") {
        email
        id
        password
        role
        username
        }
      }
    `
  })
  .then(response => {
    this,user = response.data.data.user;
  })
  .catch(error => {
    console.error(error);
    return '';
  });
},
  },
};
</script>


<style scoped>
@import url(https://fonts.googleapis.com/css?family=Calibri:400,300,700);

body {

    font-family: 'Calibri', sans-serif !important;
    font-size: 14px;
}
a{
    text-decoration: none;
}
.card {
    margin: auto;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    width: 450px;
}

.alert {
    padding: .5rem .5rem !important;
}

@media(max-width:768px) {
    .card {
        width: 90% !important;
    }


}

.upper {
    padding: 6vh 6vh 3vh 6vh;
}

.lower {
    padding: 3vh 0 3vh;
    text-align: center;
}

.heading {
    display: flex;
    align-items: center;
    vertical-align: middle;
}

.heading p {
    margin-bottom: 0;
}

input {
    border: 1px solid rgba(0, 0, 0, 0.137);
    padding: 0.75rem;
    outline: none;
    width: 100%;
    min-width: unset;
    background: rgba(151, 151, 151, 0.212) !important;
}
.eye{
    background: rgba(151, 151, 151, 0.212) !important;
    padding: 1rem;

}
.row>*{
    padding-right: 0 !important;
    padding-left: 0 !important;
   
}
.form-element {
    margin: 3vh 0;
}

form .col-3,
.col-9,
.col-1,
.col--11 {
    padding: 0;
    width: min-content;
}

form .col-11 {
    padding-left: 10px;
}

form .col-1 {
    display: flex;
    align-items: center;
    color: red;
    font-size: 3vh;
    justify-content: center;
}

#code {
    text-align: center;
}

form .row {
    margin: 0;
}

hr {
    margin: 0;
    border-top: 2px solid rgba(0, 0, 0, .1);
}

#input-header {
    color: grey;
}

.invalid {
    color: grey;
    line-height: 1.2;
}

.btn {
    width: 50%;

    color: white;
    padding: 1.5vh 0;
}

.btn:focus {
    box-shadow: none;
    outline: none;
    box-shadow: none;
    color: white;
    -webkit-box-shadow: none;
    -webkit-user-select: none;
    transition: none;
}

.btn:hover {
    color: white;
}

input:focus::-webkit-input-placeholder {
    color: transparent;
}

input:focus:-moz-placeholder {
    color: transparent;
}

/* FF 4-18 */
input:focus::-moz-placeholder {
    color: transparent;
}

/* FF 19+ */
input:focus:-ms-input-placeholder {
    color: transparent;
}

input{
    border: none;
}
/* IE 10+ */
</style>

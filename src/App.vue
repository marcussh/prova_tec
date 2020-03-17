<template>
  <b-container>
 
      <b-card-group deck >
        <b-card id="titulo"
          header="Cadastro"
          header-tag="header"
          header-bg-variant="info">

          <!-- A div é mostrada ao final do cadastro, exibindo os dados coletados no formulário -->
          <div v-if="msg">
            <label>Nome e sobrenome: {{ dados.nome }}</label><br/>
            <label>Telefone: {{ dados.telefone }}</label><br/>
            <label>Como nos conheceu? {{ dados.como_conheceu }}</label><br/>
            <label>Possui rede social? {{ dados.rede_social }}</label><br/>
            <label>Quais? {{ dados.rede }}</label><br/>
          </div>
          
        <div v-if="!msg">
        <b-form @submit.prevent="cadastrar">
          <b-form-group>

            <label>Nome e sobrenome:</label>
            <b-form-input type="text" placeholder="Digite o seu nome e sobrenome..." 
                v-model.trim="$v.dados.nome.$model" 
                :class="{'is-invalid':$v.dados.nome.$error, 'is-valid':!$v.dados.nome.$invalid}">
            </b-form-input>

              <div class="valid-feedback"></div>
              <div class="invalid-feedback">
                  <span v-if="!$v.dados.nome.required">Insira um nome e sobrenome</span>
              </div>

            <label>Telefone:</label>
            <b-form-input type="text" placeholder="(  ) ____ - ____"
              v-mask="['(##) ####-####', '(##) #####-####']"
              v-model.trim="$v.dados.telefone.$model" 
              :class="{'is-invalid':$v.dados.telefone.$error, 'is-valid':!$v.dados.telefone.$invalid}"/>
              </b-form-input>

              <div class="valid-feedback"></div>
              <div class="invalid-feedback">
                <span v-if="!$v.dados.telefone.required">Insira um telefone</span>
              </div>
              
              <label>Como nos conheceu?</label>
              <b-form-select v-model="$v.dados.como_conheceu.$model"
                :class="{'is-invalid':$v.dados.como_conheceu.$error, 
                'is-valid':!$v.dados.como_conheceu.$invalid}">
                  <b-form-select-option :value="null">Selecione uma opção</b-form-select-option>
                  <b-form-select-option value="tv">TV</b-form-select-option>
                  <b-form-select-option value="internet">Internet</b-form-select-option>
                  <b-form-select-option value="outros">Outros</b-form-select-option>
               </b-form-select>

                <div class="valid-feedback"></div>
                <div class="invalid-feedback">
                  <span v-if="!$v.dados.como_conheceu.required">Selecione uma opção</span>
                </div>

              <label>Possuei rede social?</label>
              <b-form-radio-group v-model="$v.dados.rede_social.$model"
                :class="{'is-invalid':$v.dados.rede_social.$error,
                 'is-valid':!$v.dados.rede_social.$invalid}">
                  <b-form-radio value="sim">Sim</b-form-radio>
                  <b-form-radio value="nao">Não</b-form-radio>
              </b-form-radio-group>
                  <div class="valid-feedback"></div>
                    <div class="invalid-feedback">
                        <span v-if="!$v.dados.rede_social.required">Selecione uma opção</span>
                    </div>

                <div v-if="dados.rede_social == 'sim'">
                <label>Quais?</label>
            
                <b-form-checkbox v-model="dados.rede" value="facebook">Facebook</b-form-checkbox>
                <b-form-checkbox v-model="dados.rede" value="linkedin">LinkedIn</b-form-checkbox>
                <b-form-checkbox v-model="dados.rede" value="twitter">Twitter</b-form-checkbox>
      </div>
      <br />
      
        <b-button type="submit" variant="primary">Cadastrar</b-button>
        <b-button type="reset" variant="danger">Limpar campos</b-button>
      </b-form-group>
    </b-form>
  </div>
     <b-alert show v-if="msg">Cadastro realizado com sucesso!</b-alert>
    </b-card>
  </b-card-group>
  
  
</div>
</b-container>
</template>

<script>

import { mask } from 'vue-the-mask';
import { required } from 'vuelidate/lib/validators';

export default {
    
  data () {
    return {
      //Inicialização das variáveis do formulário ao carregar a página.
      dados : {
      nome: '',
      telefone: '',
      rede_social: '',
      como_conheceu: null,
      rede: [],
      },
      msg: false
    }
  },
  
  //Validação dos campos do formulário
  validations: {
    dados : {
         nome: {required},
         telefone: {required},
         como_conheceu: {required},
         rede_social: {required}
    }
   
  },
  

  methods: {
    //Método cadastrar: Confere se os campos estão validados e realiza a submissão do formulário.
    cadastrar(){ 
      this.$v.$touch()
      if(this.$v.$invalid){
           console.log('erro');
      } else {
        this.$http.post('http://localhost:3000/bd', this.dados)
        .then((response) => {
          this.msg = true;
            })
        .catch((error) => {})
 
      }
      
    }, 
  },
    //Uso da diretiva 'mask' da biblioteca 'The Mask' para criar a máscara do campo de telefone.
   directives: {mask}
}
</script>

<style>
.container {
  margin-top: 15px;
}

.card-header {
  font-weight: bold;
  text-align: center;
  font-size: 2rem;
  padding-top: 2px;
}

label {
  margin-top: 15px;
  font-weight: bold;
}

.custom-control-label {
  font-weight: normal;
  margin-top: 5px;
}
</style>

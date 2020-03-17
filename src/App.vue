<template>
  <div>
    <b-container>
    <h2>Cadastro</h2>
    <b-form @submit.prevent="cadastrar()">
      <b-form-group>
      <b-form-input placeholder="Digite o seu nome e sobrenome..." 
        id="nome" 
             
        name="nome" 
        type="text" 
        v-model.trim="$v.nome.$model">
      </b-form-input>
      <span v-show="errors.has('nome')">{{ errors.first('nome') }}</span>
      <!--
      <b-form @submit.prevent="cadastrar()">
      <b-form-group>
      <b-form-input placeholder="Digite o seu nome e sobrenome..." 
        v-validate data-vv-rules="required"
        id="nome" 
        data-vv-as="Nome" 
        name="nome" 
        type="text" 
        v-model="dados.nome">
      </b-form-input>
      <span v-show="errors.has('nome')">{{ errors.first('nome') }}</span>
      -->
      
      
      <b-form-input type="tel" v-model="dados.telefone" placeholder="Telefone de contato" v-mask="['(##) ####-####', '(##) #####-####']" />
      <!--
      <the-mask :mask="['(##) ####-####', '(##) #####-####']" placeholder="Telefone de contato" />
      -->
      </b-form-input>
      <span v-show="errors.has('telefone')">{{ errors.first('telefone') }}</span>

 
      <b-form-select v-model="como_conheceu" :options="opcoes"></b-form-select>

      <b-form-radio v-model="rede_social" name="rede" value="Sim">Sim</b-form-radio>
      <b-form-radio v-model="rede_social" name="rede" value="Não">Não</b-form-radio>
      <span>{{ rede_social }}</span>

           <b-form-checkbox value="facebook">Facebook</b-form-checkbox>
      <b-form-checkbox value="twitter">LinkedIn</b-form-checkbox>
      <b-form-checkbox value="twitter">Twitter</b-form-checkbox>


      </b-form-group>

      <!--
      <input id="telefone" name="telefone" v-validate data-vv-rules="required" type="text" v-model="dados.telefone">

      <label for="como_conheceu">Como nos conheceu?</label>
      <select v-model="selected">
      <option disabled value="">Escolha um item</option>
      <option>TV</option>
      <option>Internet</option>
      <option>Outros</option>
      </select>

      <label for="rede_social">Possui rede social?</label>
      <input type="radio" id="sim" value="Sim" >
      <label for="sim">Sim</label>

      <input type="radio" id="nao" value="Não">
      <label for="nao">Não</label>
      
      


      <label for="quais">Quais?</label>
      <input type="checkbox" id="facebook">
      <label for="facebook">Facebook</label>

      <input type="checkbox" id="linkedin">
      <label for="linkedin">LinkedIn</label>
      
      <input type="checkbox" id="twitter">
      <label for="twitter">Twitter</label>
  -->
      <b-button type="submit" variant="outline-primary">Cadastrar</b-button>
    
    </b-form>
    <span>{{ dados.nome }}</span>
    <br />
    <span>{{ dados.telefone }}</span>

    </b-container>
  </div> 
</template>

<script>

import Dados from './domain/dados/Dados';
import { TheMask } from 'vue-the-mask';
import { mask } from 'vue-the-mask';
import { required } from 'vuelidate/lib/validators';
export default {
  

  data(){
    return {
      dados: new Dados(),
      rede_social: ''
      //como_conheceu: null,
      // opcoes: [
      //     { value: null, text: 'Selecione uma opção...' },
      //     { value: 'tv', text: 'TV' },
      //     { value: 'internet', text: 'Internet' },
      //     { value: 'outros', text: 'Outros' }

      // ]
      
    }
  },

  validations: {
    nome: {
      required
    }
  },
  
  methods: {
    cadastrar() {

      
      this.$validator
      .validateAll()
      .then(success => {
        if (success){
         this.$http.post('http://localhost:3000/bd', this.dados)
      .then(() => this.dados = new Dados(), err => console.log(err));
        } else {
         this.$http.post('http://localhost:3000/bd', this.dados)
      .then(() => this.dados = new Dados(), err => console.log(err));
          
        }
      });

       this.$http.post('http://localhost:3000/bd', this.dados)
      .then(() => this.dados = new Dados(), err => console.log(err));
        

      console.log(this.dados.nome);
      console.log(this.dados.telefone);
      console.log(this.dados.como_conheceu);



      this.dados = new Dados();

    }
  },

  components: {
    TheMask
    },

    directives: {
      mask
    }
}
</script>

<style scoped>

</style>

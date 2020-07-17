<template>
  <div class="flex justify-center items-center h-screen">
    <div class=" rounded overflow-hidden shadow-2xl">
      <div class="flex flex-wrap p-2 py-5">
        <process-bar :percentage='percentage' class="mx-2 mb-2 h-5"></process-bar>
      </div>
      <div class="p-10 pt-5">
        <form class="w-full max-w-lg ">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="full-name">
                Full Name
              </label>
              <input v-model="form.name" @change="addItem(form,fbData,updateProgress())" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="John Deo">
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="age">
                Age
              </label>
              <input v-model="form.age" @change="addItem(form,fbData,updateProgress())" min="0" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="number" placeholder=23>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="gender">
                Gender
              </label>
              <div class="relative">
                <select v-model="form.gender" @change="addItem(form,fbData,updateProgress())" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="city">
              City
            </label>
            <input v-model="form.city" @change="addItem(form,fbData,updateProgress())" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="Atlanta">
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="country">
              Country
            </label>
            <input v-model="form.country" @change="addItem(form,fbData,updateProgress())" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  type="text" placeholder="USA">
          </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import values from "lodash/values";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";

import { db } from "../firebaseDatabase";
import ProcessBar from "../components/ProcessBar";

const id='EhAWi678TAjcE6uI5drJ';
const data = db.collection('formData');

export default {
  name: 'Home',
  components: {
    ProcessBar
  },
  watch: {
    form: {
      handler(val){
        this.addItem(val,this.fbData,this.updateProgress)
      },
      deep: true
  },
  },
  methods: {
      updateProgress(){
        let count=0;
        values(this.form).map(item=>{if(item) count++;});
        this.percentage=20*count;
      },
     addItem:debounce(async(form,fbdata,updatePro) => {
        if(!isEqual(form, fbdata)){
          await db.collection("formData").doc(id).set(form).then(updatePro)
        }
    }, 1000)
  },
  mounted:async()=>{
    await db.collection("formData").doc(id).set({});
  },
  firestore: {
    fbData: data.doc(id)
  },
  data(){
    return {
      form:{
        name:'',
        age:null,
        gender:"",
        city:'',
        country:'',
      },
      percentage:0,
      fbData:{}
  }},
}
</script>

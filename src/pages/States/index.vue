<template>
    <div class="padding10">
      <div v-for="error in errors" :key="error.status">
        <p class="error">{{$t('errors.' + error.msg)}}</p>
      </div>
      
      <div v-if="loaded">
          <SelectBox :searchPlaceholder="$t('search')" :placeholder="$t('chooseItem')" :search="false" :multiple="false" v-model="selectedOption" :dataSource="dataSource" :width="300">
            <template slot="header" slot-scope="slotProps">
             {{slotProps.option.text || $t('chooseItem')}}
            </template>
            <template slot="item" slot-scope="slotProps">
              {{slotProps.option.text}}
            </template>
            <template slot="empty" >
              {{$t('nothingWasFound')}}
            </template>
          </SelectBox>
      </div>
      <div v-else>
        <p>{{$t('loading')}}</p>
      </div>
        <div>
          {{$t('selected')}} => {{Array.isArray(displaySelectedOption) ? displaySelectedOption : displaySelectedOption.value}}
        </div>
    </div>    
</template>

<script>
import SelectBox from "@/components/SelectBox/index.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    SelectBox
  },
  computed: {
    displaySelectedOption() {
      return this.selectedOption !== null && Array.isArray(this.selectedOption)
        ? this.selectedOption.flatMap(el => el.value)
        : this.selectedOption;
    },
    ...mapGetters("countries", ["getStatesModel"])
  },
  async mounted() {
    try {
      await this.getStates();
      this.dataSource = this.getStatesModel;

      this.loaded = true;
    } catch (error) {
      this.errors.push({
        status: error.response.status,
        msg: "status" + error.response.status
      });
    } finally {
      this.loaded = true;
    }
  },
  data() {
    return {
      selectedOption: "",
      dataSource: [],
      loaded: false,
      errors: []
    };
  },
  methods: {
    ...mapActions("countries", ["getStates"])
  }
};
</script>

<style>
@import url("./styles.css");
</style>

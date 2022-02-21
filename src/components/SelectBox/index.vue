<template>
  <div class="select normal" :style="{'width': width + 'px'}" >
    <div class="select-field" :class="{ 'is-active': isOpen }">
      <div
        @click="openMenu"
        :placeholder="placeholder"
        class="select-input"
        :class="[{ 'is-placeholder': placeholder && (!selected && !multiple || (multiple && selectedMultiple.length === 0)) }]"
      >
        <div>
            <div v-if="multiple && selectedMultiple.length > 0" class="select-multiple">
              <p  
              v-for="(option, index) in selectedMultiple"
              :key="option.value"
              class="select-multiple-item-header"
              >
                <slot name="header" v-bind:option="option">{{option.text || placeholder}}</slot>

                <span class="select-reset-btn" @click="removeMultiple($event, index)">
                      <img src="@/assets/svg/red-x.svg" alt="Delete icon">
                </span>
              </p>
            </div>

            <div v-else-if="multiple && selectedMultiple.length === 0">
              <slot name="header" v-bind:option="selected">{{placeholder}}</slot>
            </div>
            <div v-else>
               <slot name="header" v-bind:option="selected">{{selected.text || placeholder}}</slot>
            </div>
        </div>
      </div>

      <div
        v-if="!selected"
        class="select-arrow"
        :class="[{ 'is-down': !isOpen }, { 'is-up': isOpen }]"
      >
          <img src="@/assets/svg/arrow.svg" alt="Arrow icon">
      </div>

      <div v-if="selected && !multiple" @click="reset" class="select-reset" :style="{'left': width - 30 + 'px'}">
        <img src="@/assets/svg/red-x.svg" alt="Reset icon">
      </div>
    </div>

      <div
        v-show="isOpen"
        class="select-menu"
        :class="{ 'is-scrollable': scrollEnabled }"
      >
        <input
          v-if="search"
          v-model="searchValue"
          @input="searching"
          :placeholder="searchPlaceholder"
          class="select-search-input"
        />
        <div v-show="isEmpty" class="select-empty">
          <slot name="empty"> Nothing was found</slot>
        </div>

        <div>
            <div
            @click="selectOption(option)"
            v-for="(option, index) in filteredDataSource"
            :key="option.value"
            class="select-option"
            :class="{ 'is-selected': option.text === selected.text || multiple && selectedMultiple.some(el => el.text === option.text) }"
          >
            <slot name="item" v-bind:option="option">{{ option.text }}</slot>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: "Choose item"
    },
    searchPlaceholder: {
      type: String,
      default: "Search..."
    },
    dataSource: {
      type: Array,
      default: () => []
    },
    search: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      isOpen: false,
      selected: "",
      selectedMultiple: [],
      searchValue: "",
      enableScrollAmount: 5
    };
  },
  mounted() {
    this.selected = "";
    this.selectedMultiple = [];
  },
  computed: {
    isEmpty() {
      return this.filteredDataSource.length === 0;
    },
    scrollEnabled() {
      return this.filteredDataSource.length > this.enableScrollAmount;
    },
    filteredDataSource() {
      return this.dataSource.filter(el => {
        return el.text.toLowerCase().startsWith(this.searchValue.toLowerCase());
      });
    }
  },
  methods: {
    closeMenu() {
      this.isOpen = false;
    },
    removeMultiple(e, index) {
      e.preventDefault();
      e.stopPropagation();

      this.selectedMultiple.splice(index, 1);
    },
    selectOption(option) {
      if (this.multiple) {
        this.addMultiple(option);
      } else {
        this.selected = option;
      }

      if (this.search) {
        this.searchValue = "";
      }

      this.isOpen = false;

      this.$emit(
        "input",
        this.multiple ? this.selectedMultiple : this.selected
      );
    },
    addMultiple(option) {
      if (!this.optionExists(option)) {
        this.selectedMultiple.push(option);
      }
    },
    optionExists(option) {
      return (
        this.selectedMultiple.findIndex(el => el.value === option.value) > -1
      );
    },
    searching(event) {
      this.searchValue = event.target.value;
    },
    openMenu() {
      this.searchValue = "";
      this.isOpen = !this.isOpen;
    },
    reset() {
      this.selected = "";
      this.$emit("input", this.selected);
    }
  }
};
</script>

<style scoped >
@import url("./styles.css");
</style>

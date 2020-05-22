<template>
    <div>
        <div class="block">
            <el-date-picker
            class="date"
            v-model="value"
            type="date"
            ref="picker"
            @change="handle_change"
            placeholder="选择日期">
            </el-date-picker>
        </div>
    </div>
    
</template>

<script>
  
export default {
    name: 'ChangeBirthday',
    data() {
      return {
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value: '',
      };
    },
    methods: {
        show() {
            this.$refs.picker.focus()
        },

        handle_change() {
            this.$emit('change_birthday', this.value)            
        }
    },
  };
</script>

<style scoped>

</style>
<template>
  <div
    class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
    @click="handleClick"
  >
    <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
      <img :src="room.avatar" :alt="room.title" class="w-12 h-12 rounded-full" />
    </div>
    <div class="flex-1">
      <h2 class="text-lg font-semibold">{{ room.title }}</h2>
      <p class="text-gray-600">{{ room.messages[0]?.content || "메시지가 없습니다." }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["select"]);

function handleClick() {
  emit("select", props.room);
}
</script>

<style scoped>
</style>

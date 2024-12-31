<template>
  <div class="w-1/4 bg-white border-r border-gray-300 sm:w-1/3 md:w-1/4 lg:block hidden">
    <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
      <h1 class="text-2xl font-semibold">채팅 목록</h1>
    </header>
    <div class="overflow-y-auto h-full p-3 pb-20 scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      <ChatRoomListItem
        v-for="room in chatRooms"
        :key="room.id"
        :room="room"
        @select="selectChatRoom"
      />
    </div>
  </div>
</template>

<script setup>
import ChatRoomListItem from "./ChatRoomListItem.vue";

const props = defineProps({
  chatRooms: {
    type: Array,
    required: true,
  },
  selectChatRoom: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped>
</style>

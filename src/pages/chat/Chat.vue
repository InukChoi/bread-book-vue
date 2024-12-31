<script setup>
import { ref, onMounted } from "vue";
import { useChatRoomStore } from "../../stores/useChatRoomStore";
import { useLoadingStore } from "../../stores/useLoadingStore";
import { useRouter, useRoute } from "vue-router";
import ChatSidebar from "./ChatSidebar.vue";

const loadingStore = useLoadingStore();
const chatRoomStore = useChatRoomStore();
const router = useRouter();
const route = useRoute();

const selectedChatRoom = ref(null);

onMounted(async () => {
  loadingStore.startLoading();
  await chatRoomStore.fetchchatRooms();
  const roomId = parseInt(route.params.id, 10);
  selectedChatRoom.value = chatRoomStore.chatRooms.find((room) => room.id === roomId);
  loadingStore.stopLoading();
});

function selectChatRoom(room) {
  selectedChatRoom.value = room;
  router.push(`/chat/${room.id}`);
}
</script>

<template>
  <div class="flex h-screen overflow-hidden mt-16">
    <ChatSidebar :chatRooms="chatRoomStore.chatRooms" :selectChatRoom="selectChatRoom" />
    <div class="flex-1 flex flex-col items-center justify-center p-4">
      <img src="../../assets/icon/talkimage.png" alt="" class="mb-4 w-24 h-24" />
      <h1 class="text-2xl font-bold text-center">채팅방을 선택해주세요</h1>
    </div>

  </div>
</template>

<style scoped></style>

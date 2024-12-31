<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useChatRoomStore } from "../../stores/useChatRoomStore";
import { useLoadingStore } from "../../stores/useLoadingStore";
import ChatSidebar from "./ChatSidebar.vue";
import ChatPaymentModal from "./ChatPaymentModal.vue";

const loadingStore = useLoadingStore();
const chatRoomStore = useChatRoomStore();
const router = useRouter();
const route = useRoute();

const selectedChatRoom = ref(null);
const isPaymentModalVisible = ref(false);

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

function showPaymentModal() {
  isPaymentModalVisible.value = true;
}

function hidePaymentModal() {
  isPaymentModalVisible.value = false;
}
</script>

<template>
  <div class="flex h-screen overflow-hidden mt-16">
    <!-- Sidebar -->
    <ChatSidebar
      :chatRooms="chatRoomStore.chatRooms"
      :selectChatRoom="selectChatRoom"
    />
    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col">
      <!-- Chat Header -->
      <header v-if="selectedChatRoom" class="flex bg-white p-4 text-gray-700 border-b border-gray-300 shadow-md">
        <h1 class="text-2xl font-semibold">{{ selectedChatRoom.title }}</h1>
        <button @click="showPaymentModal" class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-4">결제하기</button>
      </header>
      <!-- Chat Messages -->
      <div v-if="selectedChatRoom" class="flex-1 overflow-y-auto p-4 h-full scrollbar">
        <div v-for="(message, index) in selectedChatRoom.messages" :key="index" class="mb-4">
          <div v-if="message.sender === 'user'" class="flex mb-4">
            <div class="max-w-md bg-indigo-200 rounded-lg p-3">{{ message.content }}</div>
          </div>
          <div v-else class="flex justify-end mb-4">
            <div class="max-w-md bg-indigo-500 text-white rounded-lg p-3">{{ message.content }}</div>
          </div>
        </div>
      </div>
      <!-- Chat Input -->
      <footer v-if="selectedChatRoom" class="bg-white border-t p-4">
        <div class="flex items-center">
          <input type="text" placeholder="메시지를 입력하세요..." class="flex-1 border p-2 rounded-md" />
          <button class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">전송</button>
        </div>
      </footer>
    </div>
    <!-- Payment Modal -->
    <ChatPaymentModal :isVisible="isPaymentModalVisible" @close="hidePaymentModal" />
  </div>
</template>

<style scoped>
</style>

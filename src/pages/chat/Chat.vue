<script setup>
import { ref, onMounted } from "vue";
import { useChatRoomStore } from "../../stores/useChatRoomStore"; // Store import
import { useRouter, useRoute } from "vue-router"; // 라우터 import
import { useLoadingStore } from "../../stores/useLoadingStore";
import { useMemberStore } from "../../stores/useMemberStore";

const memberStore = useMemberStore();
const loadingStore = useLoadingStore();
const chatRoomStore = useChatRoomStore();
const router = useRouter();
const route = useRoute();

const selectedChatRoom = ref(null);

// 컴포넌트가 마운트될 때 실행
onMounted(async () => {
  loadingStore.startLoading();
  await chatRoomStore.fetchchatRooms(); // 채팅방 데이터 로드
  const roomId = parseInt(route.params.id, 10); // URL에서 id 가져오기
  selectedChatRoom.value = chatRoomStore.chatRooms.find((room) => room.id === roomId);
  loadingStore.stopLoading();
});

// 채팅방 선택 핸들러
function selectChatRoom(room) {
  selectedChatRoom.value = room;
  router.push(`/chat/${room.id}`); // URL 변경
}
</script>

<template>
  <div class="flex h-screen overflow-hidden mt-16">
    <!-- Sidebar -->
    <div class="w-1/4 bg-white border-r border-gray-300 sm:w-1/3 md:w-1/4 lg:block hidden">
      <!-- Sidebar Header -->
      <header class="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 class="text-2xl font-semibold">채팅 목록</h1>
      </header>

      <!-- Contact List -->
      <div class="overflow-y-auto h-full p-3 pb-20 scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200">
        <!-- Dynamic Chat Room List -->
        <div
          v-for="room in chatRoomStore.chatRooms"
          :key="room.id"
          class="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
          @click="selectChatRoom(room)"
        >
          <div class="w-12 h-12 bg-gray-300 rounded-full mr-3">
            <img
              :src="room.avatar"
              :alt="room.title"
              class="w-12 h-12 rounded-full"
            />
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold">{{ room.title }}</h2>
            <p class="text-gray-600">{{ room.messages[0]?.content || "메시지가 없습니다." }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
  
  </div>
</template>

<style lang="css" scoped>
.flex.h-screen.overflow-hidden.pt-16{
  margin-top: 9px;
}
</style>

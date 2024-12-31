<script setup>
import Menu from "./paymentComponents/menu.vue";
import orderList from './paymentComponents/orderList.vue';
import payList from './paymentComponents/payList.vue';
import { usePaymentStore } from "../../stores/paymentStore";
import { onMounted, computed, watch, ref } from 'vue';
import { useLoadingStore } from "../../stores/useLoadingStore"

const loadingStore = useLoadingStore(); //추가
const paymentStore = usePaymentStore();
// 구매내역 판매내역역
const chooseMenu = computed(() => paymentStore.statusMenu);
// 드롭다운 온 오프프
const isDropdownOpen = ref(false);
// 드롭다운 용 list
const dropItem = ref([]);
// input태그
const searchTitle = ref("");
let titles;




onMounted(async () => {
    loadingStore.startLoading(); //데이터 로드 전에 loadingStore.startLoading() 호출.
    await paymentStore.pays();
    await paymentStore.orders();
    loadingStore.stopLoading(); // 데이터 로드 후 loadingStore.stopLoading()호출.
});




// 드롭다운 열기
const toggleDropdown = () => {
    if (chooseMenu.value === "buy") {
        dropItem.value = paymentStore.paysList;
    } else {
        dropItem.value = paymentStore.ordersList;
    }
    isDropdownOpen.value = !isDropdownOpen.value;
    titles = dropItem.value.map(item => ({
        title:item.title,
        orders_id:item.orders_id,
        book_image:item.book_image
    }));
};

// 리스트 책 제목들
// const titles = dropItem.value.map(item => item.title);
const filteredTitles = ref(dropItem);
// input에 입력한 내용
const logInput = () => {
    filteredTitles.value = titles.filter(item =>item.title.toLowerCase().startsWith(searchTitle.value.toLowerCase()));
    console.log(filteredTitles.value);
};



// // // 검색어로 필터링된 항목들
// const filteredItems = computed(() => {
//     console.log("terst");
//     return items.value.filter(item =>
//         item.toLowerCase().startsWith(input.value.toLowerCase())
//     );
// });




// 드롭다운 닫기 (1초 지연)
const closeDropdown = () => {
    setTimeout(() => {
        isDropdownOpen.value = false;
    }, 130);  // 1초(1000ms) 후에 드롭다운을 닫음
};



// 항목 선택 시 처리
const selectItem = (item) => {
    console.log(item);
    searchTitle.value = item;  // 선택된 항목의 이름을 검색창에 입력
};
</script>

<template>
    <div style="display: flex; justify-content: center; margin-top: 50px;">
        <div class="container">
            <div class="title">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" role="img">
                    <path
                        d="M14.265 19.537a.9.9 0 1 0 1.27-1.274l-8.362-8.34 8.365-8.387A.9.9 0 0 0 14.263.264l-9 9.024a.902.902 0 0 0 .002 1.273l9 8.976z"
                        fill="#1e1d29" fill-rule="evenodd"></path>
                </svg>
                <h1 class="paymentList"><strong>거래내역</strong></h1>
            </div>

            <Menu></Menu>

            <div class="search wrap">
                <label for="voice-search" class="sr-only">Search</label>
                <div class="relative w-full wrap">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" style="z-index: 2;"
                            fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <input type="text" id="voice-search" autocomplete="off" v-model="searchTitle"
                        @focus="toggleDropdown" @blur="closeDropdown" @input="logInput"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="상품명으로 검색" required="">

                </div>
            </div>


            <!-- <ul v-if="isDropdownOpen && filteredItems.length > 0" class="dropdown-list">
                <li v-for="(item, index) in filteredItems" :key="index" @click="selectItem(item)">
                    {{ item }}
                </li>
            </ul> -->

            <ul v-if="isDropdownOpen" id="dropdown"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <router-link v-for="item in filteredTitles" :key="item.orders_id" class="dropdown-menu"
                    :to="`/paymentDetails/${item.orders_id}`" @mouseover="selectItem(item.title)">
                    <img class="object-contain" :src="item.book_image" :alt="item.title" />
                    <div class="title">{{ item.title }}</div>
                </router-link>
            </ul>

        

            <div v-if="chooseMenu === 'buy'">
                <payList></payList>
            </div>
            <div v-else>
                <orderList></orderList>

            </div>

        </div>
    </div>
</template>


<style lang="css" scoped>
body {
    display: flex;
    justify-content: center;
}

.container {
    width: 70% !important;
    position: relative;
}

.title {
    display: flex;
    align-items: center;
    padding: 0px 20px;
}

.wrap {
    display: flex;
}

.paymentList {
    font-size: 18px;
    margin-left: 10px;
}


#voice-search {
    border-radius: 5px;
    font-weight: 700;
    font-weight: 700;
    z-index: 1;
    font-size: 16px;
}

.search {
    max-width: 100%;
    margin: 15px 5%;
    justify-items: center;
}

.search .relative.w-full {
    justify-content: center;
    height: 45px;
}

.search .BTN {
    height: 45px;
    cursor: pointer;
    margin: 0px 0px 0px 10px;
    padding: 11px 12px 10px;
    border-radius: 6px;
    box-shadow: rgb(229, 229, 229) 0px 0px 0px 1px inset;
}


#dropdown {
    overflow-y: auto;
    position: absolute;
    margin-top: -20px;
    min-height: 90px;
    max-height: 300px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 90%;
    border-radius: 0px 0px 5px 5px;
}

.dropdown-menu {
    width: 100%;
    height: 90px;
    border-bottom: 1px solid rgb(209, 213, 219);
    padding: 15px 30px;
    display: flex;
    align-items: center;
}

.dropdown-menu:hover {
    background-color: #f0f0f0;
}

.dropdown-menu img {
    height: 60px;
    width: 48px;
}

.dropdown-menu .title {
    margin-left: 35px;
    font-weight: 600;
    font-size: 15px;
}
</style>
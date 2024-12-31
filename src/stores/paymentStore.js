import axios from "axios";
import { defineStore } from 'pinia';

// 로그인 된 유저의 id 추가
export const usePaymentStore = defineStore('payment', {
    state: () => ({
        statusMenu: null, ordersList: [], paysList: [], option: null, details: null
    }),
    actions: {
        chooseMenuList(newStatusMenu) {
            this.statusMenu = newStatusMenu;
            return this.statusMenu;
        },

        chooseStateList(newOption) {
            if (this.statusMenu === 'buy') {
                
                if (newOption === "status-fin") {
                    return this.option = "판매완료";
                } else if (newOption === "status-ing") {
                    return this.option = '판매중';
                } else {
                    return this.option = "전체";
                }

            }
            else {
                
                if (newOption === "status-fin") {
                    return this.option = "구매완료";
                } else if (newOption === "status-ing") {
                    return this.option = '거래중';
                } else {
                    return this.option = "전체";
                }

            }
        },

        async orders() {
            const response = await axios.post(
                "https://d09b3780-f25b-445b-9f45-3eecc45c906b.mock.pstmn.io/orderList"
            );
            this.ordersList = response.data;
        },

        async order(id) {
            const response = await axios.post(
                "https://f1e8f15e-347b-4505-af07-9aeb8e9ff91b.mock.pstmn.io/orderList/"+id
            );
            return response.data;
        },

        async pays() {
            const response = await axios.post(
                "https://d09b3780-f25b-445b-9f45-3eecc45c906b.mock.pstmn.io/payList"
            );
            this.paysList = response.data;
        },

        async paymentDetails() {
            const response = await axios.post(
                "https://d09b3780-f25b-445b-9f45-3eecc45c906b.mock.pstmn.io/paymentDetails"
            );
            return this.details = response.data;
        },

    }
})
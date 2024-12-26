import { defineStore } from 'pinia';
import axios from 'axios';

export const useMemberStore = defineStore('member', {
    state: () => ({member: {}, isLogin: false}),
    actions: {
        async fetchMemberWithId(id, pw) {
            const response = await axios.post("https://f1e8f15e-347b-4505-af07-9aeb8e9ff91b.mock.pstmn.io/api/login", {id:id, pw:pw});
            this.member = response.data;
            return response;
        },
        async loginCheck() {
            const result = await axios.get("/api/user/auth/check", { withCredentials: true });
            if (result.data.isSuccess) {
                this.isLogin = true;
            }
            return result.data;
        }
    }
})
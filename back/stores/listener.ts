import {defineStore} from 'pinia'
export const useListenerStore = defineStore('listener', () => {
    const auth = useAuthStore();
    const tasks = useTasksStore();
    const register = async (user) => {
        Echo.private(`task.${user.id}`)
            .listen(`.task.finished`, (e) => {
                console.log(e, 'ds');
                tasks.changeTask(e.task);
            })
            .listen(`.task.started`, (e) => {
                console.log(e, 'ds');
                tasks.addTask(e.task);
            });
        Echo.private(`user.${user.id}`)
            .listen(`.auth.verified`, () => {
                if (auth.user) {
                    auth.user.email_verified_at = new Date();
                }
            });
    }

    return {
        register,
    };
})

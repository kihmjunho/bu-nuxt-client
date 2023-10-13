<script setup lang="ts">
import { Params } from '~/types/types';
const { api } = useRuntimeConfig().public;

const { push } = useRouter();

const params = useRoute().params as unknown;
const { category, id } = params as Params;

const { deleteContent } = useContent(api);

onMounted(() => {
  deleteContent(id, category);
  push('/login');
});
</script>

<template>
<div class="pagination">
    <div class="pagination-button"
        v-if="currentPage > 1"
        @click="changePage(pagesCount-1)"
    >
        &lt;&lt;
    </div>
    <div class="pagination-button"
        v-if="currentPage > 1"
        @click="changePage(1)"
    >
        first
    </div>
    <div class="pagination-button"
        v-for="page in pageNumbers" 
        :key="page"
        :class="{active: page==currentPage}"    
        @click="changePage(page)"
    >
        {{page}}
    </div>
    <div class="pagination-button"
        v-if="currentPage < pagesCount"
        @click="changePage(pagesCount)"
    >
        last
    </div>
    <div class="pagination-button"
        v-if="currentPage < pagesCount"
        @click="changePage(currentPage+1)"
    >
        &gt;&gt;
    </div>
</div>
</template>

<script>
export default {
    name: "Pagination",
    props: ['currentPage', 'pagesCount', 'changePage'],
    computed: {
        pageNumbers(){
            const page = this.currentPage;
            return [page-2, page-1, page, page+1, page+2]
                .filter(elem => elem >= 1 && elem <= this.pagesCount)
        }
    }
}
</script>
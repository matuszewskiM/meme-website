<template>
<div class='alert'
    :class='type'
>
    <div class='content'>
        {{content}}
    </div>
    <div class='cross-button'
        @click="removeAlert(id)"
    >                
        <fa-icon icon="times" size="md"/>
    </div>
</div>
</template>

<script>
export default {
    name: 'AlertModal',
    props: ['content', 'type', 'removeAlert', 'id']
}
</script>
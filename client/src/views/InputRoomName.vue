<template>
    <div class="room-name">
        <div class="room">
            <form class="inner">
                <div class="">
                    <div class="input-field col s6">
                        <input id="input_text" type="text" placeholder="Enter Room Name">
                        <label for="input_text">Room Name</label>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.room-name {
    width: 100%;
    height: 100%;
    margin: 0;
}

.room {
    margin-top: 25%;
    margin-left: 30%;
    margin-right: 30%;
}

.inner {
    padding-top: 10%;
    padding-bottom: 10%;
}

</style>

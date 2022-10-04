<template>
    <div>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item><a @click="goParent" class="bread-parent">{{
                    config.parentTitle
            }}</a></el-breadcrumb-item>
            <el-breadcrumb-item class="head-title">{{ config.title + " / " + name + " 集" }}
            </el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="like-line" justify="end">
            <el-col :xs="6" :sm="2">
                <el-button size="medium" plain @click="likeEvent"
                    style="width: 106px; max-width: 106px; min-width: 106px">
                    <el-icon class="like-button">
                        <StarFilled style="transform: scale(1.4)" v-if="likeStatus" />
                        <Star v-else />
                    </el-icon>
                    <span v-if="likeStatus">已收藏</span> <span v-else>收藏</span>
                </el-button>
            </el-col>
        </el-row>

        <div class="vertical-flex">
            <el-row justify="space-around">
                <el-col :xs="24" :md="14">
                    <div class="vertical-center">
                        <div :id="'dplayer' + config.path" class="dplayerStyle" />
                    </div>
                </el-col>
                <el-col :md="6" class="hidden-sm-below">
                    <div class="vertical-center">

                        <el-empty v-if="
                            this.mediaData[config.path] &&
                            this.mediaData[config.path].length == 0
                        " description="API 寄了, 点击重新加载 1" @click="reloadVideo">
                        </el-empty>

                        <el-table v-else :data="this.mediaData[config.path]" height="50vh" @row-click="changeVideo"
                            :row-class-name="rowColor">
                            <el-table-column prop="name" label="Episode" align="center" width="100" sortable>
                            </el-table-column>
                            <el-table-column prop="history" label="History" align="center"></el-table-column>
                        </el-table>
                    </div>
                </el-col>
            </el-row>
            <el-row justify="center" v-loading="loading" class="hidden-sm-up fix-bottom">
                <el-col :span="24">

                    <el-empty v-if="
                        this.mediaData[config.path] &&
                        this.mediaData[config.path].length == 0
                    " description="API 寄了, 点击重新加载 2" @click="reloadVideo">
                    </el-empty>

                    <el-table v-else :data="this.mediaData[config.path]" height="33vh" @row-click="changeVideo"
                        :row-class-name="rowColor">
                        <el-table-column prop="name" label="Episode" align="center" sortable></el-table-column>
                        <el-table-column prop="history" label="History" align="center"></el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>

    </div>

</template>

<script>
import { inject } from "vue";
import { loadVideo } from "@/components/js/MediaData.js";
import { ArrowRight, Star, StarFilled } from "@element-plus/icons-vue";
import DPlayer from "dplayer";
import { changeStatus, isLiked } from "@/components/js/Likes.js";
import { fillHistory, getHistory, updateHistory, getHistoryTime, addHistoryRecord } from "@/components/js/History.js";

export default {
    name: "VideoPage",
    props: ["config"],
    components: {
        Star,
        StarFilled,
    },
    data() {
        return {
            loading: true,
            dp: null,
            name: "",
            likStatus: false,
        };
    },
    setup() {
        const mediaData = inject("mediaData");
        const apiConfig = inject("apiConfig");
        const Tab = inject("Tab");
        const Likes = inject("Likes");

        return {
            mediaData,
            apiConfig,
            Tab,
            Likes,
            ArrowRight,
        };
    },
    async mounted() {
        await loadVideo(this.config, this.$data, this.mediaData, this.apiConfig);
        fillHistory(this.config, this.mediaData);
        this.$nextTick(function () {
            this.name = getHistory(this.config, this.mediaData);
            let time = getHistoryTime(this.config, this.name);
            this.dp = new DPlayer({
                container: document.getElementById("dplayer" + this.config.path),
                mutex: false,
                video: { url: this.getUrlByName(this.name) },
            });
            this.dp.seek(time);
            addHistoryRecord(this.config, this.name);
            this.dp.on('timeupdate', () => {
                updateHistory(this.config, this.name, this.dp.video.currentTime);
            });
        });
    },
    computed: {
        likeStatus() {
            console.log(this.Likes);
            return isLiked(this.Likes, this.config);
        },
    },
    beforeUnmount() {
    },
    unmounted() {
        this.dp && this.dp.destroy();
    },
    methods: {
        likeEvent() {
            changeStatus(this.Likes, this.config);
        },
        reloadVideo() {
            loadVideo(this.config, this.$data, this.mediaData, this.apiConfig);
            console.log("mediaData");
        },
        goParent() {
            this.Tab.addPage({ id: this.config.parentTitle });
        },
        changeVideo(row) {
            this.name = row.name;
            this.dp.switchVideo({ url: row.url });
            fillHistory(this.config, this.mediaData);
            let time = getHistoryTime(this.config, this.name);
            this.dp.seek(time);
            addHistoryRecord(this.config, this.name);
            this.dp.play();
        },
        rowColor(row) {
            if (!row) return "success-row";
            else return "";
        },
        getUrlByName(name) {
            let res = this.mediaData[this.config.path][0].url
            this.mediaData[this.config.path].forEach(item => {
                if (item.name === name) res = item.url;
            });
            return res;
        }
    },
    errorCaptured(error, instance, info) {
        console.log(error, instance, info);
        return false;
    }
};
</script>


<style scoped>
el-row,
el-col {
    height: 100%;
}

.like-line {
    height: 1.6rem;
    margin: 0;
    padding-right: 3rem;
    margin-bottom: 13px !important;
}

.like-button {
    margin-right: 4px;
    color: #e6cb3a;
}

@media only screen and (max-width: 820px) {
    .el-breadcrumb {
        padding-bottom: 5px !important;
        margin-bottom: 0.6rem !important;
        line-height: 25px !important;
    }

    .head-title {
        max-height: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        white-space: nowrap;
    }

    .dplayerStyle {
        min-height: 26vh;
        max-height: 26vh;
    }

    .vertical-flex {
        padding-top: 0.6rem;
        display: flex;
        height: 64vh;
        width: 100%;
        justify-content: space-between;
        flex-direction: column;
        flex-wrap: nowrap;
    }

}

@media only screen and (min-width: 820px) {
    .like-line {
        padding-right: 8rem;
    }

    .el-breadcrumb {
        padding-bottom: 0.7rem !important;
        margin-bottom: 0.8rem !important;
        line-height: 2rem !important;
    }

    .dplayerStyle {
        min-height: 26vh;
        max-height: 35rem;
        max-width: 60rem;
    }
}

.el-breadcrumb {
    border-bottom: 2px solid #c0c2c6;
    padding-left: 2rem;
    margin-bottom: 0.8rem;
    font-size: 1rem;
}
</style>

<style>
.el-button.is-plain {
    --el-button-active-text-color: var(--el-color-primary);
    --el-button-active-border-color: var(--el-color-primary);
    --el-button-hover-text-color: black;
    --el-button-hover-bg-color: var(--el-color-white);
    --el-button-hover-border-color: #e6cb3a;
}

.dplayer-full-in-icon {
    display: none !important;
}

.dplayer-airplay-icon {
    display: none !important;
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-lighter);
}

@media only screen and (max-width: 820px) {
    .hidden-sm-below {
        display: none !important;
    }

    .fix-bottom {
        margin-top: 2rem;
    }
}

@media only screen and (min-width: 820px) {
    .hidden-sm-up {
        display: none !important;
    }

    .vertical-center {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 63vh;
    }
}

.el-breadcrumb__inner a:hover,
.el-breadcrumb__inner.is-link:hover {
    color: var(--el-color-primary) !important;
    cursor: pointer !important;
}

.bread-parent {
    font-weight: normal !important;
    text-decoration: none !important;
    color: var(--el-text-color-primary) !important;
    transition: var(--el-transition-color) !important;
}

.el-breadcrumb__inner {
    font-weight: bolder !important;
    text-decoration: none !important;
    color: var(--el-text-color-primary) !important;
}
</style>

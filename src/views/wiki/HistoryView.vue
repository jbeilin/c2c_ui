<template>
    <div v-if="history" class="section content">
        <html-header title="Old version"/>
        <h1>
            <icon-document :document-type="documentType" class="is-large"/>
            <router-link :to="{ name: documentType, params: {id:documentId, lang:lang} }">{{ history.title }}</router-link>
        </h1>
        <p>
            <span v-translate>
                List of versions for language:
            </span>
            <span>
                {{ $gettext(lang) }}
            </span>
        </p>
        <div class="field is-grouped">
            <div class="control">
                <button
                    v-if="documentType!='profile'"
                    class="button is-primary"
                    @click="gotToDiff"
                    v-translate>
                    Compare selected versions
                </button>
            </div>
            <div class="control">
                <router-link
                    :to="{name:documentType, params:{id:documentId, lang:lang}}"
                    class="button is-link"
                    v-translate>
                    See the latest version
                </router-link>
            </div>
        </div>
        <table>
            <tr>
                <th/>
                <th v-translate>Created on</th>
                <th v-translate>Author</th>
                <th v-translate>comment</th>
            </tr>
            <tr v-for="version of history.versions" :key="version.verion_id">
                <td>
                    <div v-if="documentType!='profile'" class="control">
                        <input v-model="versionFrom"
                               :disabled="versionTo <= version.version_id"
                               :value="version.version_id"
                               type="radio"
                               name="versionFrom">
                        <input v-model="versionTo"
                               :disabled="versionFrom >= version.version_id"
                               :value="version.version_id"
                               type="radio"
                               name="versionTo">
                        <diff-link
                            v-if="version.version_id != last_version_id"
                            :document-type="documentType"
                            :id="documentId"
                            :lang="lang"
                            version-from="prev"
                            :version-to="version.version_id"/>
                    </div>
                </td>
                <td>
                    <version-link :document-type="documentType" :id="documentId" :version="version.version_id" :lang="lang">
                        {{ version.written_at | moment("YYYY-MM-DD hh:mm:ss") }}
                    </version-link>
                </td>
                <td>
                    <contributor-link :contributor="version"/>
                </td>
                <td>
                    {{ version.comment }}
                </td>
            </tr>
        </table>
        <div class="field is-grouped">
            <div class="control">
                <button class="button is-primary" @click="gotToDiff" v-translate>
                    Compare selected versions
                </button>
            </div>
            <div class="control">
                <router-link
                    :to="{name:documentType, params:{id:documentId, lang:lang}}"
                    class="button is-link"
                    v-translate>
                    See the latest version
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import c2c from '@/apis/c2c'

    export default {

        data() {
            return { // theese three data are computed
                history: null,
                versionFrom:undefined,
                versionTo:undefined,
                last_version_id:undefined,
            }
        },

        computed:{
            documentId(){
                return parseInt(this.$route.params.id)
            },
            documentType(){
                return this.$route.name.replace("-history","")
            },
            lang(){
                return this.$route.params.lang
            },
        },

        watch:{
            "$route":{
                handler:"load",
                immediate: true,
            }
        },

        methods: {

            load() {
                c2c[this.documentType].getHistory(this.documentId, this.lang).then(response => {
                    this.history=response.data;
                    this.last_version_id = this.history.versions[0].version_id
                    this.history.versions = this.history.versions.reverse()
                    this.versionFrom = this.history.versions[this.history.versions.length-1].version_id
                    this.versionTo = this.history.versions[0].version_id
                });
            },

            gotToDiff(){

                this.$router.push({
                    name: this.documentType + "-diff", params: {
                        versionFrom:this.versionFrom,
                        versionTo:this.versionTo,
                        lang:this.lang
                    }
                })
            }
        },
    }

</script>

<style scoped>
    td{
        white-space:nowrap;
    }

    td:nth-child(4) {
        width: 100%;
        white-space:normal;
        font-style:italic;
    }
</style>
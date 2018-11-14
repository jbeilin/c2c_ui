<template>
    <div>
        <dropdown-button v-for="category of categorizedFields" :key="category.name"
                         :disabled="category.fields.length===0"
                         class="category-button"
                         @changeDisplay="refreshSliders()">

            <span slot="button">
                <span>{{ $gettext(category.name) }}</span>
                <span v-if="category.activeCount!=0">
                    ({{ category.activeCount }})
                </span>
            </span>

            <div class="sub-query-items">
                <query-item v-for="field of category.fields" :key="field.name" :field="field"/>
            </div>

        </dropdown-button>

        <association-query-item :document-types="associations"/>
    </div>
</template>

<script>
    import constants from '@/js/constants'
    import QueryItem from './QueryItem'
    import AssociationQueryItem from './AssociationQueryItem'

    const categorizedFieldsDefault = {
        General : [
            "title",
            "activities",
            "article_type",
            "area_type",
            "book_types",
            "waypoint_type",
            "event_type",
            "condition_rating",
            "climbing_outdoor_type",
            "route_types",
            "lang",
            "quality",
            "categories",
        ],

        ratings:[
            "global_rating",
            "rock_free_rating",
            "rock_required_rating",
            "aid_rating",
            "engagement_rating",
            "risk_rating",
            "equipment_rating",
            "exposition_rock_rating",
            "ice_rating",
            "mixed_rating",
            "ski_rating",
            "hiking_rating",
            "ski_exposition",
            "labande_global_rating",
            "labande_ski_rating",
            "snowshoe_rating",
            "via_ferrata_rating",
            "mtb_down_rating",
            "mtb_up_rating",
            "hiking_mtb_exposition",
            "glacier_rating",
            "equipment_ratings",
            "exposition_rating",
            "public_transportation_rating",
            "climbing_rating_max",
            "climbing_rating_median",
            "climbing_rating_min",
            "paragliding_rating",
            "snow_clearance_rating",
        ],

        Terrain:[
            "orientations",
            "configuration",
            "elevation_max",
            "elevation_min",
            "difficulties_height",
            "height_diff_access",
            "height_diff_difficulties",
            "height_diff_down",
            "height_diff_up",
            "mtb_height_diff_portages",
            "mtb_length_asphalt",
            "mtb_length_trail",
            "rock_types",
            "slackline_type",
            "snow_quality",
            "snow_quantity",
            "avalanche_signs",
            "elevation_access",
            "elevation_down_snow",
            "elevation_up_snow",
            "children_proof",
            "prominence",
            "climbing_indoor_types",
            "climbing_outdoor_types",
            "climbing_styles",
            "elevation",
            "height_max",
            "height_median",
            "height_min",
            "length",
            "rain_proof",
            "routes_quantity",
            "length_total",
            "route_length",
            "durations",
            "glacier_gear",
        ],
        Miscs:[
            "frequentation",
            "public_transport",
//            "lift_access",
            "access_time",
            "best_periods",
            "capacity",
            "capacity_staffed",
            "custodianship",
            "product_types",
            "public_transportation_types",
            "weather_station_types",
            "nb_participants",
            "nb_impacted",
            "severity",
        ]
    }

    const categorizedFields = {
        area:categorizedFieldsDefault,
        article:categorizedFieldsDefault,
        book:categorizedFieldsDefault,
        image:categorizedFieldsDefault,
        map:categorizedFieldsDefault,
        outing:categorizedFieldsDefault,
        profile:categorizedFieldsDefault,
        route:categorizedFieldsDefault,
        waypoint:categorizedFieldsDefault,
        xreport:categorizedFieldsDefault,
    }

    export default {
        components:{
            QueryItem,
            AssociationQueryItem,
        },

        computed:{
            urlActivities(){
                return (this.$route.query.act || '').split(",")
            },

            urlWaypoint_types(){
                return (this.$route.query.wtyp || '').split(",")
            },

            fields(){
                return constants.objectDefinitions[this.documentType].fields
            },

            documentType() {
                return this.$route.name.slice(0, -1)
            },

            associations(){
                if(this.documentType == "outing")
                    return ["area", "profile", "waypoint", "route"]

                if(this.documentType == "route")
                    return ["area", "waypoint"]

                if(this.documentType == "waypoint")
                    return ["area"]

                return []
            },

            categorizedFields(){
                var result = []

                var urlFilter = {
                    activities:this.urlActivities,
                    waypoint_types:this.urlWaypoint_types,
                }

                for(let category of Object.keys(categorizedFields[this.documentType])){
                    let temp = {
                        name : category,
                        activeCount : 0,
                        fields : [],
                    }

                    let addCategory = false

                    for(let name of categorizedFields[this.documentType][category]){
                        let field = this.fields[name]
                        if(field!==undefined){

                            addCategory = true

                            if(this.$route.query[field.url] != undefined)
                                temp.activeCount += 1

                            if(field.isVisibleFor(urlFilter)){
                                temp.fields.push(field)
                            }
                        }
                    }

                    if(addCategory)
                        result.push(temp)
                }

                return result
            }
        },

        methods:{
            refreshSliders(){
                for(let dropdown of this.$children){
                    if(dropdown.isActive){
                        for(let queryItem of dropdown.$children){
                            queryItem.refreshSlider()
                        }
                    }
                }
            },
        }
    }
</script>

<style scoped>

    .category-button{
        margin-right:1em;
    }

    .sub-query-items{
        width:300px
    }

</style>
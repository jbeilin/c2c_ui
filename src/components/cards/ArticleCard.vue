<template>
  <card-container :document="document" :target="target" :highlighted="highlighted">
    <card-title>
      <document-title :document="document" />
    </card-title>

    <card-row>
      <textual-array :array="document.categories" i18n i18n-context="article_categories" />
    </card-row>

    <card-row>
      <span>
        <icon-creative-commons />
        <span>{{ $gettext(document.article_type, 'article_types') }}</span>
      </span>
    </card-row>

    <card-row>
      <card-activities-item :activities="document.activities" />
      <marker-quality :quality="document.quality" />
    </card-row>

  </card-container>
</template>

<script>

  import { documentCardMixin } from './utils/mixins.js';

  export default {
    mixins: [
      documentCardMixin
    ]
  };
</script>

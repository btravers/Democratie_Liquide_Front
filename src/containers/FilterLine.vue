<template>
  <div class="filter-line">
    <span>J'observe</span>
    <dropdown :title="filter.subjectType.title">
      <dropdown-element v-for="subjectType in subjectTypes" :key="subjectType.title" :selected="subjectType === filter.subjectType" @click.native="filterSubjectType(subjectType)">
        {{ subjectType.title }}
      </dropdown-element>
    </dropdown>
    <span>dans le channel</span>
    <dropdown :title="filter.channel.title">
        <dropdown-element v-for="channel in joinedChannels" :selected="channel === filter.channel" :key="channel.uuid" @click.native="filterChannel(channel)">
          {{ channel.title }}
        </dropdown-element>
        <dropdown-element>
          <router-link to="/channel/create" tag="button" class="simple" title="Créer un channel"><i class="fa fa-plus" aria-hidden="true"></i></router-link>
          <router-link to="/channel/list" tag="button" class="simple" title="Rejoindre ou quitter un channel" ><i class="fa fa-exchange" aria-hidden="true"></i></router-link>
        </dropdown-element>
    </dropdown>
    <span>et la categorie</span>
    <dropdown :title="filter.category.title">
        <dropdown-element v-for="category in categories" :selected="category === filter.category" :key="category.uuid" @click.native="filterCategory(category)">
          <span class="label">{{ category.title }}</span>
          <button @click.stop="delegate(category)" v-if="category.uuid" class="small delegate" title="Déléguer"><i class="fa fa-users"/></button>
        </dropdown-element>
        <dropdown-element>
          <router-link to="/category/create" tag="button" class="simple" title="Créer une catégorie"><i class="fa fa-plus" aria-hidden="true"></i></router-link>
        </dropdown-element>
    </dropdown>
    <span @click="removeFilter" title= "Réinitialiser" class="refresh fa fa-times" aria-hidden="true"></span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Dropdown from '@/components/Dropdown'
import DropdownElement from '@/components/DropdownElement'
import { subjectTypes } from '@/config/constants'
import router from '@/config/router'

export default {
  name: 'filter-line',

  computed: {
    ...mapGetters([
      'joinedChannels',
      'categories',
      'filter'
    ]),

    subjectTypes () {
      return subjectTypes
    }
  },

  methods: {
    ...mapActions([
      'filterSubjectType',
      'filterChannel',
      'filterCategory',
      'removeFilter'
    ]),

    delegate (category) {
      router.push('/category/delegate/' + category.uuid)
    }
  },

  components: {
    Dropdown,
    DropdownElement
  }
}
</script>

<style lang="scss" scoped>

  @import '../assets/style';

  .filter-line {
    text-align: center;
    padding: 10px 60px;
    background: #fcfcfc;
    line-height: 2em;
    border-top: 1px solid #eee;
    border-bottom: 2px solid #eee;
  }

  .refresh {
    margin-left: 10px;
    cursor: pointer;
    transition: all 200ms ease;
    opacity: 1;

    &:hover {
      opacity: 0.5;
    }
  }

  .label {
    flex-grow: 1;
  }

  .delegate {
    margin-left:10px;
  }

  .small {
    margin-left: 10px;
  }

  .simple {
    width: 100%;
    height: 30px;
    min-width: 50px;
    margin: 5px 0;
    font-size: 1.1em;
    padding-top: 5px;
    &:not(:first-child) {
      margin-left: 5px;
    }
  }


</style>

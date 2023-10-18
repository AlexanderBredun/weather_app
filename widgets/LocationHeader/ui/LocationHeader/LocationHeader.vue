<template>
    <div class="flex justify-between items-center mb-10 mt-24">
        <HeadingWithExtra :name="name" class="m-0">
            <template>
                <RefreshDataButton />
            </template>
        </HeadingWithExtra>
        <div class="self-center ">
            <div class="mb-8">
                <CloseLocationButton v-if="!curentLocation" :parent-id="idLocation" class="mr-8" />
                <ChangeLayoutButton />
            </div>

            <AddMoreInfoDropdown class="z-40" :blocks="availableBlocks" :parent-id="idLocation" />

        </div>
    </div>
</template>

<script lang="ts" setup>
import { AddMoreInfoDropdown } from '~/features/AddMoreInfoDropdown';
import { ChangeLayoutButton } from '~/features/ChangeLayoutButton';
import { CloseLocationButton } from '~/features/CloseLocationButton';
import { RefreshDataButton } from '~/features/RefreshDataButton';
import { HeadingWithExtra } from '~/entities/HeadingWithExtra';
import { iStructureItem } from '~/shared/lib/types';

interface LocationHeaderProps { 
    name: string;
    curentLocation?: boolean
    idLocation: string;
    availableBlocks: iStructureItem[]
}

defineProps<LocationHeaderProps>();

</script>

<style lang="scss" scoped></style>
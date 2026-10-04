<!-- src/components/BilingualTag.vue -->
<template>
  <span
    class="bilingual-tag"
    :class="{ active, dragging }"
    :data-index="index"
    draggable="true"
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @drop="onDrop"
    @dragend="onDragEnd"
    @click="onClick"
  >
    <span class="tag-copy">
      <span class="tag-chinese">{{ item.chinese }}</span>
      <span class="tag-english">
        {{ weightedEnglish }}
      </span>
      <button
        class="weight-add-btn"
        :class="{ weighted: hasWeight }"
        type="button"
        title="增加 0.1 权重，并生成带权重的英文提示词"
        @click.stop="onWeightAdd"
      >
        {{ hasWeight ? `加权 ${(item.weight ?? 1).toFixed(1)}` : "加权 +0.1" }}
      </button>
    </span>

    <span v-if="showWeight" class="weight-controls" @click.stop>
      <span class="weight-btn minus" @click.stop="onWeightAdjust(-0.1)">−</span>
      <span class="weight-value">{{ (item.weight ?? 1.0).toFixed(1) }}</span>
      <span class="weight-btn plus" @click.stop="onWeightAdjust(0.1)">+</span>
    </span>

    <span class="delete-btn" @click.stop="onDelete">✕</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { SelectedItem } from "../types";
import "./styles/BilingualTag.scss"; // 导入样式

const props = defineProps<{
  item: SelectedItem;
  index: number;
  active: boolean;
  dragging?: boolean;
  showWeight: boolean;
}>();

const emit = defineEmits<{
  (e: "drag-start", index: number): void;
  (e: "drag-over", event: DragEvent): void;
  (e: "drop", fromIndex: number, toIndex: number): void;
  (e: "drag-end"): void;
  (e: "click", index: number): void;
  (e: "weight-adjust", index: number, delta: number): void;
  (e: "weight-add", index: number): void;
  (e: "delete", index: number): void;
}>();

const hasWeight = computed(() => {
  const weight = props.item.weight ?? 1;
  return props.item.weightEnabled === true || (
    props.item.weightEnabled === undefined && Math.abs(weight - 1) > 0.001
  );
});
const weightedEnglish = computed(() => {
  const weight = props.item.weight ?? 1;
  return hasWeight.value ? `(${props.item.english}:${weight.toFixed(1)})` : props.item.english;
});

const onDragStart = (e: DragEvent) => {
  e.dataTransfer?.setData("text/plain", props.index.toString());
  e.dataTransfer!.effectAllowed = "move";
  emit("drag-start", props.index);
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.dataTransfer!.dropEffect = "move";
  emit("drag-over", e);
};

const onDrop = (e: DragEvent) => {
  e.preventDefault();
  const fromIndex = parseInt(e.dataTransfer?.getData("text/plain") || "-1");
  if (fromIndex !== -1 && fromIndex !== props.index) {
    emit("drop", fromIndex, props.index);
  }
};

const onDragEnd = () => {
  emit("drag-end");
};

const onClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (
    !target.classList.contains("delete-btn") &&
    !target.classList.contains("weight-btn") &&
    !target.classList.contains("weight-value")
  ) {
    emit("click", props.index);
  }
};

const onWeightAdjust = (delta: number) => {
  emit("weight-adjust", props.index, delta);
};

const onWeightAdd = () => {
  emit("weight-add", props.index);
};

const onDelete = () => {
  emit("delete", props.index);
};
</script>

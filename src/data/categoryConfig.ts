// src/data/categoryConfig.ts
// 面向用户的主题分类；每个主题小分类可以合并多个底层词库文件。
import type { MainCategoryConfig, SubCategoryConfig } from '../types';

type SourceFile = [sourceCategory: string, fileName: string];

const group = (
  key: string,
  label: string,
  sources: SourceFile[],
  nsfw = false
): SubCategoryConfig => ({
  key,
  label,
  fileName: sources[0][1],
  sourceCategory: sources[0][0],
  nsfw,
  sourceFiles: sources.map(([sourceCategory, fileName]) => ({ sourceCategory, fileName })),
});

const files = (...names: string[]): SourceFile[] => names.map((name) => {
  const [sourceCategory, fileName] = name.split('/');
  return [sourceCategory, fileName];
});

export const mainCategoryConfigs: MainCategoryConfig[] = [
  {
    id: 'subject',
    label: '主体',
    icon: '🎯',
    nsfw: false,
    subCategories: [
      group('person', '人物与身体', files(
        'body/bodyparts', 'body/appearance', 'body/body_features', 'body/breasts',
        'body/face', 'body/facial_features', 'body/ears', 'body/eyes', 'body/eyebrows',
        'body/nose', 'body/shoulders', 'body/neck', 'body/skin', 'body/skincolor',
        'body/tail', 'body/wings', 'body/injury'
      )),
      group('hair', '头发与发型', files('body/hair', 'body/haircolor', 'body/hairstyles')),
      group('expression', '表情与视线', files(
        'expression/eyes', 'expression/facial_detail', 'expression/facial_expression',
        'expression/gaze', 'gaze/gaze'
      )),
      group('pose', '动作与姿态', files(
        'body/hand', 'body/feet', 'body/gestures', 'body/on', 'body/posture',
        'pose/action', 'pose/gesture', 'pose/pose_or_action'
      )),
      group('characters', '角色、动物与植物', files(
        'character/character_type', 'character/gender', 'character/role_or_type',
        'character/species_or_archetype', 'character/relationship', 'character/group_size',
        'creatures/animals', 'creatures/birds', 'creatures/cats', 'creatures/dogs',
        'creatures/legendary', 'plants/plant', 'plants/tree', 'plants/flowers',
        'realword/companies', 'realword/jobs'
      )),
      group('clothing', '服装', files(
        'apparel/attire', 'apparel/clothing', 'apparel/clothing_style', 'apparel/dress',
        'apparel/sleeves', 'apparel/legwear', 'apparel/footwear', 'apparel/headwear',
        'apparel/mask', 'apparel/bra', 'apparel/panties', 'apparel/swimsuit',
        'apparel/underwear_or_swimwear'
      )),
      group('adult_clothing', '裸露与性感服装', files(
        'apparel/sexualattire', 'apparel/nudity', 'apparel/exposure'
      ), true),
      group('objects', '物体与道具', files(
        'objects/airplanes', 'objects/armor', 'objects/vehicles', 'objects/helicopters',
        'objects/ships', 'objects/weapons', 'objects/sexobjects', 'objects_background/object'
      )),
      group('adult', 'NSFW 成人内容', files(
        'body/ass', 'body/pussy', 'body/penis', 'pose/sexualized_pose',
        'sex/adult_theme', 'sex/anatomy', 'sex/sexacts', 'sex/sexualacts',
        'sex/sexualpositions', 'sex/simulatedsexacts', 'sex/bdsm', 'sex/bondage',
        'sex/fetish_or_scenario', 'sex/sex_toys', 'sex/bodily_fluids'
      ), true),
    ],
  },
  {
    id: 'scene',
    label: '场景',
    icon: '🏞️',
    nsfw: false,
    subCategories: [
      group('background', '背景与环境', files(
        'composition/backgrounds', 'image_attributes/background', 'scene/details',
        'scene/setting', 'objects_background/setting'
      )),
      group('location', '地点与场合', files(
        'realword/locations', 'realword/holidays', 'objects_background/occasion'
      )),
      group('sky', '天空与自然', files('scene/sky')),
    ],
  },
  {
    id: 'style',
    label: '风格',
    icon: '🎨',
    nsfw: false,
    subCategories: [
      group('rendering', '画面类型', files(
        'image_attributes/anime', 'image_attributes/illustration',
        'image_attributes/photorealistic', 'image_attributes/sketch',
        'image_attributes/format_or_style', 'image_attributes/publication_format'
      )),
      group('art_direction', '艺术方向', files(
        'image_attributes/genre', 'image_attributes/origin', 'composition/atisticlicense',
        'composition/fineartparody', 'apparel/fashionstyle'
      )),
      group('graphic', '图案、符号与文字', files(
        'image_attributes/pattern', 'composition/patterns', 'composition/symbols',
        'composition/text', 'composition/japanesedialects', 'composition/yeartags'
      )),
    ],
  },
  {
    id: 'camera',
    label: '镜头语言',
    icon: '🎥',
    nsfw: false,
    subCategories: [
      group('composition', '构图与画面结构', files(
        'composition/imagecomposition', 'composition/charactercount', 'composition/framing',
        'image_attributes/framing'
      )),
      group('view', '视角与景别', files(
        'composition/viewpoint', 'image_attributes/viewpoint', 'composition/distance',
        'composition/angle'
      )),
      group('camera', '相机与镜头', files('composition/camera')),
    ],
  },
  {
    id: 'mood',
    label: '氛围词',
    icon: '🌙',
    nsfw: false,
    subCategories: [
      group('color_light', '颜色与光照', files(
        'composition/colors', 'image_attributes/illumination', 'lighting/illumination',
        'lighting/cinematic', 'lighting/dynamic'
      )),
      group('time_theme', '时间与主题氛围', files(
        'image_attributes/time_of_day', 'lighting/time_of_day', 'image_attributes/theme'
      )),
      group('effects', '视觉效果', files('image_attributes/visual_effect')),
    ],
  },
  {
    id: 'detail',
    label: '细节修饰',
    icon: '✨',
    nsfw: false,
    subCategories: [
      group('accessories', '配饰与穿戴细节', files(
        'apparel/accessories', 'apparel/handwear', 'apparel/neckwear',
        'apparel/embellishment', 'apparel/eyewear', 'apparel/makeup', 'apparel/covering'
      )),
      group('small_objects', '小物件与装饰物', files(
        'objects/audio', 'objects/cards', 'objects/playingcard', 'objects/doors',
        'objects/eyewear', 'objects/piercings', 'composition/censorship'
      )),
      group('technical', '画面属性与技术参数', files(
        'image_attributes/character_group', 'image_attributes/expression_sheet',
        'image_attributes/file_properties', 'image_attributes/language', 'image_attributes/layout',
        'image_attributes/merchandise', 'image_attributes/metadata', 'image_attributes/resolution',
        'image_attributes/setting'
      )),
      group('search', '搜索与预设', files('image_attributes/search_preset'), true),
    ],
  },
];

export const mainButtons = mainCategoryConfigs.map(({ id, label, icon, nsfw }) => ({
  id,
  label,
  icon,
  nsfw,
}));

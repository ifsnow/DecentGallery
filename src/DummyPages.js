import {
  EFFECTS,
  EFFECT_TYPES,
} from '~/types';

const pages = [];

pages.push({
  effect: EFFECTS.VERTICAL_THREE_FOLDING,
  image: require('~/assets/image1.jpg'),
});

pages.push({
  effect: EFFECTS.VERTICAL_TWO_SECTIONS,
  effectType: EFFECT_TYPES.TYPE1,
  image: require('~/assets/image2.jpg'),
});

pages.push({
  effect: EFFECTS.HORIZONTAL_TWO_SECTIONS,
  effectType: EFFECT_TYPES.TYPE1,
  image: require('~/assets/image3.jpg'),
});

pages.push({
  effect: EFFECTS.FOUR_SECTIONS,
  effectType: EFFECT_TYPES.TYPE1,
  image: require('~/assets/image4.jpg'),
});

pages.push({
  effect: EFFECTS.VERTICAL_TWO_SECTIONS,
  effectType: EFFECT_TYPES.TYPE2,
  image: require('~/assets/image5.jpg'),
});

pages.push({
  effect: EFFECTS.HORIZONTAL_TWO_SECTIONS,
  effectType: EFFECT_TYPES.TYPE2,
  image: require('~/assets/image6.jpg'),
});

pages.push({
  effect: EFFECTS.FOUR_SECTIONS,
  effectType: EFFECT_TYPES.TYPE3,
  image: require('~/assets/image7.jpg'),
});

pages.push({
  effect: EFFECTS.VERTICAL_TWO_SECTIONS,
  effectType: EFFECT_TYPES.TYPE3,
  image: require('~/assets/image8.jpg'),
});

pages.push({
  effect: EFFECTS.FOUR_SECTIONS,
  effectType: EFFECT_TYPES.TYPE2,
  image: require('~/assets/image9.jpg'),
});

pages.push({
  effect: EFFECTS.FOUR_SECTIONS,
  effectType: EFFECT_TYPES.TYPE3,
  image: require('~/assets/image10.jpg'),
});

export default pages;

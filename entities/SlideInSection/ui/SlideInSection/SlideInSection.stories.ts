import type { Meta, StoryObj } from '@storybook/vue3';
import SlideInSection from './SlideInSection.vue';


const meta = {
	title: 'entities/SlideInSection',
	component: SlideInSection,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof SlideInSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		showStatus: true
	},
};
import type { Meta, StoryObj } from '@storybook/vue3';
import ScrollList from './ScrollList.vue';


const meta = {
	title: 'shared/ScrollList',
	component: ScrollList,
	tags: ['autodocs'],
	argTypes: {},
} satisfies Meta<typeof ScrollList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		default(_) {
			return (
				<>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
					<li>
						asdasdasd
					</li>
				</>
			);
		},
	},
};
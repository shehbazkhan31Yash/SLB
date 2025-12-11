import type { Meta, StoryObj } from '@storybook/angular';
import { StatusChipComponent } from './status-chip.component';

const meta: Meta<StatusChipComponent> = {
  component: StatusChipComponent,
  title: 'UI/StatusChip',
};

export default meta;
type Story = StoryObj<StatusChipComponent>;

export const Draft: Story = {
  args: {
    status: 'draft',
  },
};

export const InReview: Story = {
  args: {
    status: 'in-review',
  },
};

export const Approved: Story = {
  args: {
    status: 'approved',
  },
};

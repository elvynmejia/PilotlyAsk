import { render, fireEvent } from '@testing-library/vue';
import { createTestingPinia } from '@pinia/testing';
import { VueQueryPlugin } from '@tanstack/vue-query';

import Chat from './../../src/components/Chat.vue';

let rendered: any;

describe('Chat component', () => {
    beforeEach(() => {
        rendered = render(
            Chat,
            {
                global: {
                    plugins: [
                        VueQueryPlugin,
                        createTestingPinia({
                            stubActions: false
                        }),
                    ]
                },
            }
        );
    });

    describe('verifies UI interactions', () => {
        it('with enter key', async () => {
            const { getByText, findByPlaceholderText} = rendered;
    
            getByText(/How well did we do delivering your/i);
            const rateItem = getByText('5');
            await fireEvent.click(rateItem);
            
            getByText(/Thanks! Can you please tells us why you chose 5?/);
    
            const input = await findByPlaceholderText('Type your message...');
            await fireEvent.update(input, 'The delivery was ontime for brew day');
            
            await fireEvent.keyUp(input, { key: 'enter', keyCode: 13 });
    
            getByText(/The delivery was ontime for brew day/i);
        });

        it('with button submit', async () => {
            const { getByText, findByPlaceholderText } = rendered;
    
            getByText(/How well did we do delivering your/i);
            const rateItem = getByText('5');
            await fireEvent.click(rateItem);
            
            getByText(/Thanks! Can you please tells us why you chose 5?/);
    
            const input = await findByPlaceholderText('Type your message...');
            await fireEvent.update(input, 'The delivery was ontime for brew day');
            
            const submit = getByText('>');
            await fireEvent.click(submit);

            getByText(/The delivery was ontime for brew day/i);
        });
    });
});
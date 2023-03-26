import React from 'react';
import * as Environment from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import * as SUT from './index';

describe('Dropdown', () => {
    const FIELD_ONE = 'ONE';
    const FIELD_TWO = 'TWO';
    const fields = [
        { value: FIELD_ONE, label: FIELD_ONE },
        { value: FIELD_TWO, label: FIELD_TWO },
    ];

    let onChangeMock: jest.Mock<any, any>;
    let onBlurMock: jest.Mock<any, any>;

    beforeEach(() => {
        Environment.cleanup();
        onBlurMock = jest.fn();
        onChangeMock = jest.fn();
    });

    test('should render', async () => {
        Environment.render(
            <SUT.Dropdown current={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const element = await Environment.screen.findAllByText(FIELD_ONE);
        expect(element.length).toBe(2);
    });

    test('should have closed options on render', async () => {
        Environment.render(
            <SUT.Dropdown current={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const notvisible = await Environment.screen.findByText(FIELD_TWO);
        expect(notvisible).toBeInTheDocument();
    });

    test('should have open options on click on select', async () => {
        Environment.render(
            <SUT.Dropdown current={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const select = await Environment.screen.findAllByText(FIELD_ONE);
        await Environment.waitFor(() => UserEvent.click(select[1]));
        const visible = await Environment.screen.findByText(FIELD_TWO);
        expect(visible).toBeInTheDocument();
    });

    test('should close on option select', async () => {
        Environment.render(
            <SUT.Dropdown current={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const select = await Environment.screen.findAllByText(FIELD_ONE);
        await Environment.waitFor(() => UserEvent.click(select[0]));
        const visible = await Environment.screen.findByText(FIELD_TWO);
        await Environment.waitFor(() => UserEvent.click(visible));
        expect(visible).toBeInTheDocument();
    });

    test('should call onChange', async () => {
        Environment.render(
            <SUT.Dropdown current={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const select = await Environment.screen.findAllByText(FIELD_ONE);
        await Environment.waitFor(() => UserEvent.click(select[1]));
        const visible = await Environment.screen.findByText(FIELD_TWO);
        await Environment.waitFor(() => UserEvent.click(visible));
        expect(onChangeMock).toBeCalledWith(FIELD_TWO);
    });

    test('should call on blur', async () => {
        Environment.render(
            <SUT.Dropdown current={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const select = await Environment.screen.findAllByText(FIELD_ONE);
        await Environment.waitFor(() => UserEvent.click(select[1]));
        const visible = await Environment.screen.findByText(FIELD_TWO);
        await Environment.waitFor(() => UserEvent.click(visible));
        await Environment.waitFor(() => UserEvent.tab());
        expect(onChangeMock).toBeCalledWith(FIELD_TWO);
    });
});

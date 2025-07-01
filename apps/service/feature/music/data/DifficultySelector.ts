import { SelectOption } from '@skillnavi/ui';

export const DifficultyDivider = [
    'all',
    '100',
    '150',
    '200',
    '250',
    '300',
    '350',
    '400',
    '450',
    '500',
    '550',
    '600',
    '650',
    '700',
    '750',
    '800',
    '850',
    '900',
    '950',
] as const;

export type DifficultyTypes = (typeof DifficultyDivider)[number];

export const difficultySelector: SelectOption[] = [
    {
        display: 'ALL',
        value: 'all',
    },
    {
        display: '1.00~1.49',
        value: '100',
    },
    {
        display: '1.50~1.99',
        value: '150',
    },
    {
        display: '2.00~2.49',
        value: '200',
    },
    {
        display: '2.50~2.99',
        value: '250',
    },
    {
        display: '3.00~3.49',
        value: '300',
    },
    {
        display: '3.50~3.99',
        value: '350',
    },
    {
        display: '4.00~4.49',
        value: '400',
    },
    {
        display: '4.50~4.99',
        value: '450',
    },
    {
        display: '5.00~5.49',
        value: '500',
    },
    {
        display: '5.50~5.99',
        value: '550',
    },
    {
        display: '6.00~6.49',
        value: '600',
    },
    {
        display: '6.50~6.99',
        value: '650',
    },
    {
        display: '7.00~7.49',
        value: '700',
    },
    {
        display: '7.50~7.99',
        value: '750',
    },
    {
        display: '8.00~8.49',
        value: '800',
    },
    {
        display: '8.50~8.99',
        value: '850',
    },
    {
        display: '9.00~9.49',
        value: '900',
    },
    {
        display: '9.50~9.99',
        value: '950',
    },
];

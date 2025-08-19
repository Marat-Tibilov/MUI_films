export const MAIN_BLOCK_STYLES = {
    FIRST_BOX: {
        display: 'grid',
        gridTemplateColumns: "1fr 5fr",
        gap: 4,
    },
    SECOND_BOX: { maxHeight: '100vh', overflow: 'auto' },
    THIRD_BOX: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        rowGap: '28px',
        alignItems: 'center',
    }
}
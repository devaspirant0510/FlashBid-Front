import { Spinner } from '@shared/components/ui';

const DefaultLoading = () => {
    return (
        <div className={'w-full text-center m-2'}>
            <Spinner className={'size-8'} />
        </div>
    );
};
export default DefaultLoading;

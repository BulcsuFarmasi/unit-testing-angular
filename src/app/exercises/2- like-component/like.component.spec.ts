import { LikeComponent } from './like.component';

describe('LikeComponent', () => {
    let likeComponent: LikeComponent;

    beforeEach(() => {
        likeComponent = new LikeComponent();
    });

    it('should set totalLike initially to 0', function () {
        expect(likeComponent.totalLikes).toBe(0);
    });

    it('should set iLike initially to false', function () {
        expect(likeComponent.iLike).toBeFalsy();
    });

    describe('click', () => {

        it('should invert iLike',  () => {
            likeComponent.click();

            expect(likeComponent.iLike).toBeTruthy();
        });

        it('should increment totalLikes by 1',  () => {
            likeComponent.click();

            expect(likeComponent.totalLikes).toBe(1);
        });

        it('should invert twice after calling twice',  () => {
            likeComponent.click();
            likeComponent.click();

            expect(likeComponent.iLike).toBeFalsy();
        });

        it('should decrement totalLikes by -1 after calling it twice',  () => {
            likeComponent.click();

            expect(likeComponent.totalLikes).toBe(0);
        });



    });

});
import { VoterComponent } from './voter.component';

describe('VoterComponent', function () {
    let voterComponent: VoterComponent;

    beforeEach(() => {
        voterComponent = new VoterComponent();
    })

    it('should set othersVote property to 0 initially', function () {
        expect(voterComponent.othersVote).toBe(0);
    });

    it('should set myVote property to 0 initially', function () {
        expect(voterComponent.myVote).toBe(0);
    });

    describe('upVote', () => {

        it('should return with undefined if myVote is 1', function () {
            voterComponent.myVote = 1;

            expect(voterComponent.upVote()).toBeUndefined();
        });

        it('should increment myVote if myVote is not 1', function () {
            voterComponent.upVote();

            expect(voterComponent.myVote).toBe(1);
        });

        it('should call myVoteChanged if myVote is not 1', function () {
            const spy = spyOn(voterComponent.myVoteChanged, 'emit');

            voterComponent.upVote();

            expect(spy).toHaveBeenCalled();
        });

    })

    describe('downVote', () => {

        it('should return with undefined if myVote is -1', function () {
            voterComponent.myVote = 1;

            expect(voterComponent.downVote()).toBeUndefined();
        });

        it('should decrement myVote if myVote is not -1', function () {
            voterComponent.downVote();

            expect(voterComponent.myVote).toBe(-1);
        });

        it('should call myVoteChanged if myVote is not -1', function () {
            const spy = spyOn(voterComponent.myVoteChanged, 'emit');

            voterComponent.downVote();

            expect(spy).toHaveBeenCalled();
        });

    })

    describe('totalVotes', () => {

        it('should add myVote and otherVotes', function () {
            voterComponent.myVote = 1;
            voterComponent.othersVote = 2;

            expect(voterComponent.totalVotes).toBe(3);
        });

    })

});
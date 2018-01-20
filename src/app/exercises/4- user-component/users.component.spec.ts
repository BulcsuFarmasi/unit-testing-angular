import { UsersComponent } from './users.component';
import { UserService } from './user.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';

describe('UsersComponent', function () {

    let userService: UserService;
    let usersComponent: UsersComponent

    beforeEach(() => {
        userService = new UserService(null);
        usersComponent = new UsersComponent(userService);
    })

    describe('ngOnInit', () =>  {

        it('should call service\'s getUsers method', function () {
            const spy = spyOn(userService, 'getUsers').and.returnValue(Observable.empty());

            usersComponent.ngOnInit();

            expect(spy).toHaveBeenCalled();
        });

        it('should set users property with the items returned from the server', () => {
            let users = [{id: 1}, {id: 2}]
            const spy = spyOn(userService, 'getUsers').and.returnValue(Observable.from([users]));

            usersComponent.ngOnInit();

            expect(usersComponent.users).toBe(users);
        });

    })

    describe('deleteUser', function () {

        let user = { id: 1, name: 'Bulcsú' };

        it('should call confirm method', function () {

            let spy = spyOn(window, 'confirm');

            usersComponent.deleteUser(user);

            expect(spy).toHaveBeenCalledWith('Are you sure you want to delete Bulcsú?')
        });

        it ('should NOT delete from users if user NOT confirmed', () => {

            usersComponent.users = [];
            spyOn(window, 'confirm').and.returnValue(false);
            const spy = spyOn(usersComponent.users, 'splice');

            usersComponent.deleteUser(user);

            expect(spy).not.toHaveBeenCalled();
        });

        it ('should NOT call server to delete user if user NOT confirmed', () => {

            usersComponent.users = [user];
            spyOn(window, 'confirm').and.returnValue(false);
            const spy = spyOn(userService, 'deleteUser');

            usersComponent.deleteUser(user);

            expect(spy).not.toHaveBeenCalled();
        });

        it ('should delete from users', () => {

            usersComponent.users = [user];
            const userLength = usersComponent.users.length;
            spyOn(window, 'confirm').and.returnValue(true);
            spyOn(userService, 'deleteUser').and.returnValue(Observable.empty());

            usersComponent.deleteUser(user);

            expect(usersComponent.users.length).toBe(userLength - 1);
        });

        it ('should call delete from server and put back user if deleting isn\'t succeded' , () => {

            usersComponent.users = [user];
            spyOn(window, 'confirm').and.returnValue(true);
            const error = ''
            spyOn(userService, 'deleteUser').and.returnValue(Observable.throw(error));

            usersComponent.deleteUser(user);

            expect(usersComponent.users).toEqual([user]);
        });

        it ('should call delete from server and call alert if deleting isn\'t succeded' , () => {

            usersComponent.users = [user];
            spyOn(window, 'confirm').and.returnValue(true);
            const error = ''
            spyOn(userService, 'deleteUser').and.returnValue(Observable.throw(error));
            const spy = spyOn(window, 'alert');

            usersComponent.deleteUser(user);

            expect(spy).toHaveBeenCalledWith('Could not delete the user.');
        });





    });

});
import { v4 as uuidv4 } from 'uuid';

class Student {
    constructor(
        private _firstName: string,
        private _lastName: string,
        private _id: string = uuidv4()
    ){}
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get lastName(): string {
        return this._lastName;
    }
    public set lastName(value: string) {
        this._lastName = value;
    }
    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }

    public createElement():HTMLTableRowElement{
        let row = document.createElement('tr');
        row.innerHTML = `<td>${this.firstName}</td><td>${this.lastName}</td>`
        return row;
    }
}


class Classroom {
    constructor(
        private _students: Student[] = []
    ){}
    public get students(): Student[] {
        return this._students;
    }
    public set students(value: Student[]) {
        this._students = value;
    }

    displayStudents():void{
        const table = document.getElementById('studentDisplay');
        table!.innerHTML = '';
        if (this.students.length){
            let tr = document.createElement('tr');
            tr.innerHTML = '<th>First Name</th><th>Last Name</>'
            table?.append(tr)
            for (let student of this.students){
                table?.append(student.createElement())
            }
        }
    }
}

const ourClassroom = new Classroom();

const studentForm = document.getElementById('addStudent') as HTMLFormElement;
studentForm.addEventListener('submit', (e:SubmitEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    ourClassroom.students.push(new Student(firstName, lastName))
    console.log(ourClassroom);
    ourClassroom.displayStudents();
    form.firstName.value = '';
    form.lastName.value = '';
})




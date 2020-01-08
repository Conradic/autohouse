import React from 'react';


class LinkedList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            head: null,
            size: 0
        };
    }

    printLinkedList = () => {
        let pointer = this.state.head;
        let str = '';
        if (pointer !== null) {
            str += String(pointer.data.constructor.name);
            while (pointer.next !== null) {
                str += String(pointer.data.constructor.name);
            }
        }
        return str;
    }

    add = (item) => {
        let link = Link;
        Link.setData(item);

        if (this.state.head === null) {
            this.setState({ head: link });
        }
        else {
            let linkPointer = this.state.head;
            while (linkPointer.next !== null) {
                linkPointer = linkPointer.next;
            }
            linkPointer.setNext(Link);
            this.setState({ size: this.start.size + 1 });
        }
    }

    insertElement = (element, location) => {
        if (this.state.head !== null && location !== null) {
            let linkPointer = this.state.head;
            while (linkPointer.next !== null && linkPointer.data !== location) {
                linkPointer = linkPointer.next;
            }
            linkPointer.setNext(element);
            this.setState({ size: this.state.size + 1 });
        }
    }

    removeElement = (location) => {
        if (location === this.state.head) {
            this.setState({ head: null });
        }
        else if (this.state.head !== null && location !== null) {
            let linkPointer = this.state.head;
            while (linkPointer.next !== null && linkPointer.next.data !== location) {
                linkPointer = linkPointer.next;
            }
            linkPointer.next.setData(null);
            linkPointer.setNext(linkPointer.next.next);
            this.setState({ size: this.state.size - 1 });
        }
    }

    breakChain = (location) => {
        if (this.state.head !== null && location !== null) {
            let linkPointer = this.state.head;
            let newSize = 0;
            while (linkPointer.next !== null && linkPointer.data !== location) {
                linkPointer = linkPointer.next;
                newSize++;
            }
            linkPointer.setData(null);
            linkPointer.setNext(null);
            this.state.size = newSize;
        }
    }
}

class Link {
    state = {
        data: null,
        next: null
    }
    setData = (data) => {
        this.setState({ data: data });
    }
    setNext = (next) => {
        this.setState({ next: next });
    }
}

export default LinkedList;
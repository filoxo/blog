---
title: 'An Angular Modal'
date: 2017-02-14
layout: Post
hero: '/assets/bldg.jpg'
---

This post is just an exercise in creating a modal in Angular (~2 at the time of this writing). Hopefully it can shed light on some of the things to do, not do, and to always remember. Let's get to it.

### Requirements

Here are some requirements during this build that will help guide the implementation and serve as the basis for testing. It should:

- Have a backdrop
- Open modal
- Close modal
- Prevent background scrolling when open
- Accessible<sup>*</sup>
    - Prevent losing focus when open
    - Close with <kbd>ESC</kbd>
    - Return focus to trigger on close
- Animate on open/close

<p class="note">
    * This is main motivation for writing this post.
</p>

### Template

Let's start with laying out the template. This way we know what goes where.

    <div class="backdrop" #modal>
        <div class="contents" role="dialog">
            <div>
                <ng-content></ng-content>
            </div>
            <footer>
                <button class="closeBtn">Close</button>
            </footer>
        </div>
    </div>

We have a `.backdrop` element that will be a dark translucent color to provide additional focus to the modal content (fullfills requirement 1 already 🎉). The `#modal` syntax creates a local ref that we'll use later. The `.contents` element will contain the projected content via  `<ng-content>`. The `footer` aligns the `.closeBtn`. In order to help keep the focus of this article, I've excluded the [modal component styles](https://github.com/filoxo/an-angular-modal/blob/master/src/app/app.component.css). Visit the link to get them.

### Use in App

In order to continue developing this component, it'll have to be rendered. Let's add an instance of it to the app component, as well as a few buttons that will trigger it to open. In the App component template, add:

    <app-modal #myModal>This is my modal</app-modal>
    <section class="red">
        <p>Top</p>
        <button (click)="myModal.open()">Open</button>
    </section>

### Open and close modal

Let's add some real functionality to this component now. `show` will be the private member used to store the display state. We'll expose changing this state via `open()` and `close()` methods.

    export class ModalComponent {
        private show: boolean = false;
        ...
        open() {
            this.show = true;
        }

        close() {
            this.show = false;
        }
    }

In conjunction, our template can use the `*ngIf` directive to display the content conditionally. Wire up the backdrop and the close button to the `close` method. Also, prevent clicks from bubbling up so the modal doesn't close if you click inside of it.

    <div class="backdrop" #modal *ngIf="show" (click)="close()">
        <div class="contents" (click)="$event.stopPropagation()">
            ...
            <button class="closeBtn" (click)="close()">Close</button>
        </div>
    </div>

Adding event emitters will allow us to know if a modal is opened or closed, and emit events on open and close. Add the following to the component;

    import { ..., Output, EventEmitter } from '@angular/core';
    ...
    export class ModalComponent {
        @Output() opened = new EventEmitter<any>();
        @Output() closed = new EventEmitter<any>();
        ...
        open() {
            ...
            this.opened.emit(null);
        }

        close() {
            ...
            this.closed.emit(null)
        }
    }

Done with requirements 2 & 3 👋 !

### Prevent background scrolling when open

This one is fairly easy: get the html element, and set it's `overflow` property based on the modal state. Here's what was added to the modal component.

    export class ModalComponent{
        ...
        private html: HTMLElement = document.querySelector('html');
        ...

        open() {
            ...
            this.preventBgScrolling();
        }

        close() {
            ...
            this.preventBgScrolling();
        }

        private preventBgScrolling() {
            this.html.style.overflow = this.show ? 'hidden' : '';
        }
    }

\#4 is completed 👍

### Accessiblity

Accessibility should never be an after thought. Though we're taking this on fairly late in development, its so that we had the proper structure and state in order to reflect the UI non-visually.

We started by adding `role="dialog"` to the modal `.contents`. However, adding that role alone is not sufficient to make a dialog accessible. Additionally, the dialog must be properly labeled and keyboard focus must be managed correctly.

In order to poperly label the dialog, we'll use both `aria-labelledby` and `aria-describedby`. The labelledby value will apply to a title option that won't be required; since its not required, the describedby value will be a fallback to provide the needed info.
In order to do this, the modal needs a unique ID that we'll use to prefix the IDs of these other elements. I won't make the ID required either, letting the component generate one if needed. Here's how that turned out:

    import { ..., OnInit, Input } from '@angular/core';

    interface ModalConfig extends Object {
        title?: string;
        id?: string;
    }

    const defaultConfig = <ModalConfig> {};

    let id = 0;

    ...
    export class ModalComponent implements OnInit {
        @Input() options: ModalConfig;
        ...
        ngOnInit() {
            const options = Object.assign({}, defaultConfig, this.options);
            this.id = options.id || `modal-${id++}`;
            this.titleId = `${this.id}-title`;
            this.contentId = `${this.id}-content`;
        }
    }

Let me explain what's going on here. We declare a config interface in order to define the available options. If we wanted default options, we could establish those in `defaultConfig`. The `id` value will exist in the global classspace and will increment after being used (I found this neat trick in the Angular Material project). Next, we receive an input of type `ModalConfig` and merge it with the `defaultConfig`. If no ID is passed in, then a new one is generated automatically.

    <div class="contents" role="dialog" id="{{ id }}"
        [attr.aria-labelledby]="title ? titleId : null"
        [attr.aria-describedby]="contentId">
        <h2 class="title" id="{{ titleId }}" *ngIf="title">{{ title }}</h2>
        <div id="{{ contentId }}">...</div>
    </div>

The template is then enhanced by adding the IDs, a dynamic title element that renders only if a `title` option was passed in, and binds the `labelledby` and `describedby` attrs. If there is no `title` option, the `labelledby` attr isn't rendered.

#### Prevent losing focus when open

First, focus needs to be given inside the modal. Then focus should be kept inside the modal as long as its open.

#### Close with <kbd>ESC</kbd>



#### Return focus to trigger on close

### Animations

### Improvements

The above is a pretty good modal but perhaps it doesn't meet all of your requirements. Here are some feature that you could add:

- Add additional action buttons that can be enabled/disabled as options
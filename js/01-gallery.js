import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);


const galleryItemsContainer = document.querySelector('.gallery');
const CardsMarkup = createGaleryCardsMarkup(galleryItems);

galleryItemsContainer.insertAdjacentHTML('beforeend', CardsMarkup);

function createGaleryCardsMarkup(gallery) {
    return gallery.map(({ preview, original, description }) => {
        return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </div>`;
    }).join('');  
    
};

galleryItemsContainer.addEventListener('click', onImgClick);

function onImgClick(evt) {
    evt.preventDefault();
    const lightboxConfig = {
        onShow: () => {
            document.addEventListener('keydown', onEscKeyDown);
        },
        onClose: () => {
            document.removeEventListener('keydown', onEscKeyDown);
        }
    };

    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }

    const urlBigImg = evt.target.dataset.source;
    const instance = basicLightbox.create(`
    <img src="${urlBigImg}" width="800" height="600"/>
    `,
    lightboxConfig
    )

    instance.show()
    
    function onEscKeyDown(evt) {
        if (evt.code === 'Escape' && instance.visible()) {
            instance.close()
        }
    }
};


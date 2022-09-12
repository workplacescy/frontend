export default class Analytics {
    trackInfoWindow(id, title, placeId) {
        if (typeof gtag !== "function") {
            return;
        }

        gtag('event', 'view_item', {
            currency: 'EUR',
            value: 1,
            items: [
                {
                    item_id: id,
                    item_title: title,
                    location_id: placeId,
                }
            ]
        });
    }
};

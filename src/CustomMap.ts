/// <reference types="@types/google.maps" />


export interface Mappable {
    location: {
        lat: number,
        lng: number
    },
    markerContent(): string
}

export class CustomMap {
    private googleMap: google.maps.Map

    constructor(divId:  string) {
        this.googleMap = new google.maps.Map(document.getElementById(divId) as HTMLElement, {
            zoom: 1,
            center: {
                lat: 0,
                lng: 0
            }
        });
    }

    // this method is for adding marker in specific location that user and company indicates
    addMarker(mappable: Mappable): void {
        const marker = new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: mappable.location.lat,
                lng: mappable.location.lng
            }
        })

        // this particular functionality is for generating pop up with some info while clicking marker
        marker.addListener("click", () => {
            const infoWindow = new google.maps.InfoWindow({
                content: mappable.markerContent()
            })

            infoWindow.open(this.googleMap, marker)
        })
    }

}
import { LightningElement, api, track, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getSimilarDatasets from '@salesforce/apex/DataMarketplaceController.getSimilarDatasets';
//import PRODUCT_FAMILY_FIELD from '@salesforce/schema/Product__c.Product_Family__c';

//const fields = [PRODUCT_FAMILY_FIELD];

export default class SimilarDatasets extends LightningElement {
    @api recordId;
    @api familyId;
    @track dataset;

    // Track changes to the Product_Family__c field that could be made in other components.
    // If Product_Family__c is updated in another component, getSimilarProducts
    // is automatically re-invoked with the new this.familyId parameter
    @wire(getRecord, { recordId: '$recordId'})//, fields })
    dataset;

    @wire(getSimilarDatasets, {
        datasetId: '$recordId'//,
       // familyId: '$product.data.fields.Product_Family__c.value'
    })
    similarDatasets;

    get errors() {
        const errors = [this.dataset.error, this.similarDatasets.error].filter(
            error => error
        );
        return errors.length ? errors : undefined;
    }
}
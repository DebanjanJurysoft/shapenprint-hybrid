<template>
    <div id="addressContainer" style="overflow: auto;" class="d-inline-flex flex-column w-100">
        <!-- <pre>{{address}}</pre> -->
        <div class="address-card w-100 justify-content-space" style="margin: 5px auto;">
            <div class="address-check" style="width:90%">
                <div class="form-group">
                    <input type="radio" name="add_id" value="28" id="add_id_28" class="" :checked="address.add_id == selected_address.add_id">
                    <label for="add_id" style="text-transform: uppercase;">Debanjan sdfg</label>
                </div>
                <div class="address">
                    <p>
                        {{ address.add1 + ", " + address.city + ", " + address.c_state + ", " + address.country + " - " + address.zipcode }}
                    </p>
                </div>
            </div>
            <div class="address-action-btn">
                <i>
                    <span style="font-size: large;" class="mdil mdil-pencil"></span>
                </i>
                <i>
                    <span style="font-size: large;" class="mdil mdil-delete"></span>
                </i>
                <!-- <i class="mdil mdil-pencil" style="font-size: 18px;"></i> -->
                <!-- <i class="fa fa-trash-o" style="font-size: 18px;"></i> -->
                <!-- <a id="addressEditButton_28" href="#"><img width="50" src="images/icon/edit.png"></a>
                <a id="addressDeleteButton28" href="#"><img width="50" src="images/icon/trans.png"></a> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['address', 'selected_address'],
}
</script>
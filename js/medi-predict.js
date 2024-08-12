function symptomsPop(){

    let items="";
    for(let i=1;i<=30;i++){
        items += '<label><input id="check'+i+'" type="checkbox" value="'+i+'" onchange="addRemoveSymp(this)" />Symptom '+i+'</label>';
    }
    $('#container-dropdown').html(items);

    if($('#medipop_style').length <= 0){
        const style = `
            <style id="medipop_style">
                .predict-modal-wraper{
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex !important;
                    z-index: 2000;
                    background: #0002;
                    align-items: center;
                    justify-content: center;
                }
                .predict-modal {
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 5px 5px 20px #3333;
                    min-width: 60%;
                    max-width: 90%;
                    display: flex;
                    position: relative;
                }
                .predict-modal > close {
                    position: absolute;
                    right: 4px;
                    top: 4px;
                    font-size: 20px;
                    line-height: 24px;
                    width: 24px;
                    text-align: center;
                    background: #0002;
                    cursor: pointer;
                    transition: all 0.1s;
                }
                .predict-modal close:hover {color: #c00;}
                .predict-modal .predict-modal-body{width: 75%; padding: 20px;}
                .predict-modal .predict-result{
                    background: #b6ddff;
                    padding: 20px;
                }
                .predict-modal .predict-result > div { margin-bottom: 8px; }
                .predict-modal h1 {
                    margin: 0 0 15px;
                    font-size: 22px;
                }
                .predict-modal .symptoms-list {
                    column-count: 3;
                    width: 100%;
                    height: calc(100vh - 320px);
                    overflow: auto;
                }
                .predict-modal .symptoms-list label{
                    display: block;
                    font-weight: 400;
                    margin: 0;
                    padding: 4px 10px;
                }
                .predict-modal .symptoms-list label input {
                    width: 15px;
                    height: 15px;
                    vertical-align: text-bottom;
                    margin-right: 5px;
                }
                .pt-20{padding-top: 20px}
                .selected-symptoms {
                    padding: 10px;
                    border-top: 1px solid #bbb;
                    margin-top: 20px;
                }
                .selected-symptoms item {
                    background: #fff;
                    display: inline-block;
                    box-shadow: 1px 1px 5px #3339;
                    padding: 4px 10px;
                    border-radius: 8px;
                    margin-right: 10px;
                    margin-top: 10px;
                }
                .selected-symptoms item close {
                    cursor: pointer;
                    display: inline-block;
                    width: 15px;
                    text-align: center;
                    margin-left: 2px;
                    transition: all 0.3s;
                }
                .selected-symptoms item close:hover {color: #900; transform: scale(1.5) rotate(90deg);}
            </style>
        `;
        $('head').append(style);
    }
}

function addRemoveSymp(d){
    if(d.checked){
        $('.selected-symptoms').append('<item id="sym_'+d.id+'">'+ $(d).parent().text() +' <close onclick="removeSymp(this, '+d.id+')">&times;</close></item>');
    }else{
        $('.selected-symptoms #sym_'+d.id).remove();
    }
    proceedToPredict();
}

function removeSymp(d, checkbox){
    $(d).parent().remove();
    $(checkbox).prop("checked", false);
    proceedToPredict();
}

function proceedToPredict(){
    if($('.selected-symptoms > item').length >= 3){
        $('#predict').prop('disabled', false);
    }else{
        $('#predict').prop('disabled', true);
    }
}


function symptomsPopClose(){
    $('.predict-modal-wraper').fadeOut(300, function(){
        $('#medipop_style').remove();
    });
}

function drawNameAndAddressInfo(doc,fixedFormat,displayDOB){
    if(doc==null)
        doc=document;
    var ws3_clientname = session_nv_first("ws3_clientname");
    var ws3_taxid_type = session_nv_first("ws3_taxid_type");
    var ws3_taxid = session_nv_first("ws3_taxid");
    if(back_office_get_brokerage_profile.result.result=="OK" && session_nv_exists("customer") && session_nv_first("customer")!=""){
        for(var i=0; i<back_office_get_brokerage_profile.data.length;i++){
            /*BEGIN- Code added for fixed format reports */
            if(fixedFormat) {

                var strNameAddressInfo=back_office_get_brokerage_profile.data[i].address_indicator;
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].name_address_1;
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].name_address_2;
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].name_address_3;
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].name_address_4;
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].name_address_5;
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].name_address_6;
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].name_address_7;
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].name_address_8;
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].customer;
                strNameAddressInfo+="&" +convertCustomerType(back_office_get_brokerage_profile.data[i].customer_class, back_office_get_brokerage_profile.data[i].product_class,back_office_get_brokerage_profile.data[i].data_source);
                strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].tax_id;
				strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].rep;
				strNameAddressInfo+="&" +back_office_get_brokerage_profile.data[i].rep_name;
                return strNameAddressInfo;
            }
            /*END- Code added for fixed format reports */
            doc.writeln('<table cellpadding=0 cellspacing=0 border=0 width=765><tbody>');
            drawProfileData(doc, i, "accountInfo", "accountInfoNoPad");
            doc.writeln('<tr><td><span class="accountInfo">Account# : '+back_office_get_brokerage_profile.data[i].customer+'</span>');
            if(back_office_get_brokerage_profile.data[i].product_class_description!="")
            doc.writeln('    <span class="accountInfo">Registration Type : '+back_office_get_brokerage_profile.data[i].product_class_description +'</span>');
            else
            doc.writeln('    <span class="accountInfo">Registration Type : '+convertCustomerType(back_office_get_brokerage_profile.data[i].customer_class, back_office_get_brokerage_profile.data[i].product_class,back_office_get_brokerage_profile.data[i].data_source)+'</span>');
            doc.writeln('    <span id="accountInfo"  class="accountInfoDataScreen">Tax ID : '+back_office_get_brokerage_profile.data[i].tax_id+'</span>');
            doc.writeln('    <span class="accountInfoDataPrint">Tax ID : xxx-xx-xxxx</span>');
			doc.writeln('   </td></tr><tr><td>');
			doc.writeln('    <span class="accountInfo">REP ID : '+back_office_get_brokerage_profile.data[i].rep+'</span>');
			doc.writeln('    <span class="accountInfo">REP Name : '+back_office_get_brokerage_profile.data[i].rep_name+'</span>');
            if(displayDOB){
            	var DOB=back_office_get_brokerage_profile.data[i].birth_date;
            	if (DOB!="") DOB=formatMMDDYYYY(new Date(DOB),true);
            	doc.writeln('    <span id="DOBInfo"  class="accountInfo">DOB : '+DOB+'</span>');
            }
            doc.writeln('    </td></tr>');
            doc.writeln('</tbody></table >');



        }
        return;

    }
    else if(ws3_clientname != null && ws3_taxid_type != null && ws3_taxid != null ) {
        if(fixedFormat) {
            var strNameAddressInfo=ws3_clientname+"&"+ws3_taxid_type+"&"+ws3_taxid;
            return strNameAddressInfo;
        }
        else {
            doc.writeln('<tr><td valign="top"><span id="ws3_clientname" class="accountInfo">'+ws3_clientname+'</span>');
            doc.writeln('    <span id="accountInfo"  class="accountInfoDataScreen">'+ws3_taxid_type+' : '+ws3_taxid+'</span>');
            doc.writeln('    <span class="accountInfoDataPrint">Tax ID : xxx-xx-xxxx</span><br></td></tr>');
        }
    }
  return;
}
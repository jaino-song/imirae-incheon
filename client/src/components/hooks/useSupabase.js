import { supabase } from "../db/supabase";

export const useSupabase = () => {
    const fetchVoucherData = async (typeValue, daysValue) => {
        try {
            const { data, error } = await supabase
                .from('voucherPriceInfo')
                .select('fullPrice, grant, actualPrice')
                .eq('type', typeValue)
                .eq('duration', daysValue)

            if (error) throw error;
            return { data, error: null };
        } catch (err) {
            console.error("Error fetching voucher data: ", err);
            return { data: null, err };
        }
    };

    const fetchBankData = async (areaValue) => {
        try {
            const { data, error } = await supabase
                .from('bankAccountInfo')
                .select('bankName, accNum')
                .eq('area', areaValue)

            if (error) throw error;
            return { data, error: null};
        } catch (err) {
            console.error("Error fetching bank data: ", err);
            return { data: null, error: err };
        }
    };

    return {
        fetchVoucherData,
        fetchBankData,
    };
};

export default useSupabase;
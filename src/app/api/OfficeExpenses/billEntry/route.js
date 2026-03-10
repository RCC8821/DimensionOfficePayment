
import { NextResponse } from 'next/server';
import { sheets, spreadsheetId } from '../../config/googleSheet'; // Path adjust karna

// GET: /api/dim-expenses-entry
export async function GET(request) {
  try {
    // Safety check
    if (!spreadsheetId) {
      return NextResponse.json(
        {
          success: false,
          error: 'spreadsheetId is not configured',
        },
        { status: 500 }
      );
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'Dimension_Office_Payment!A8:AJ',
    });

    let rows = response.data.values || [];

    if (rows.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No data found',
        data: [],
      });
    }

    const filteredData = rows
      .filter((row) => row[34] && !row[35]) // Pending entry only (PLANNED_4 exists, ACTUAL_4 empty)
      .map((row) => ({
        OFFBILLUID: (row[1] || '').toString().trim(),
        uid: (row[2] || '').toString().trim(),
        OFFICE_NAME_1: (row[3] || '').toString().trim(),
        PAYEE_NAME_1: (row[4] || '').toString().trim(),
        EXPENSES_HEAD_1: (row[5] || '').toString().trim(),
        EXPENSES_SUBHEAD_1: (row[6] || '').toString().trim(),
        ITEM_NAME_1: (row[7] || '').toString().trim(),
        UNIT_1: (row[8] || '').toString().trim(),
        SKU_CODE_1: (row[9] || '').toString().trim(),
        Qty_1: (row[10] || '').toString().trim(),
        Amount: (row[24] || '').toString().trim(),
        DEPARTMENT_1: (row[12] || '').toString().trim(),
        APPROVAL_DOER: (row[13] || '').toString().trim(),
        RAISED_BY_1: (row[14] || '').toString().trim(),
        Bill_Photo: (row[15] || '').toString().trim(),
        PAYMENT_MODE_3: (row[31] || '').toString().trim(),
        REMARK_3: (row[32] || '').toString().trim(),
        PLANNED_4: (row[34] || '').toString().trim(),
        ACTUAL_4: (row[35] || '').toString().trim(),
      }));

    return NextResponse.json({
      success: true,
      totalRecords: filteredData.length,
      data: filteredData,
    });
  } catch (error) {
    console.error('Error in /GET-DIM-Expenses-Data-Entry:', error.message);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch office expenses data',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// // POST: /api/dim-expenses-entry
// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const {
//       uid,
//       STATUS_4,
//       Vendor_Name_4,
//       BILL_NO_4,
//       BILL_DATE_4,
//       BASIC_AMOUNT_4,
//       CGST_4,
//       SGST_4,
//       IGST_4,
//       TOTAL_AMOUNT_4,
//       TRASNPORT_CHARGES_4, // Note: typo preserved as in original
//       Transport_Gst_4,
//       NET_AMOUNT_4,
//       Remark_4,
//     } = body;

//     console.log('Received body:', body); // Debug log

//     if (!uid) {
//       return NextResponse.json(
//         { success: false, message: 'Bill No (uid) is required' },
//         { status: 400 }
//       );
//     }

//     const trimmedBillNo = String(uid).trim();

//     // 1. Find row by Bill No (column B7:B)
//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: spreadsheetId,
//       range: 'Dimension_Office_Payment!C7:C',
//     });

//     const values = response.data.values || [];
//     const rowIndex = values.findIndex((row) => {
//       if (!row || row.length === 0) return false;
//       return String(row[0]).trim() === trimmedBillNo;
//     });

//     if (rowIndex === -1) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'No matching Bill No found',
//           searchedFor: trimmedBillNo,
//         },
//         { status: 404 }
//       );
//     }  

//     const sheetRowNumber = 7 + rowIndex;

//     // 2. Prepare batch updates
//     const updates = [];

//     // Stage 4 columns (AK onwards)
//     if (STATUS_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AK${sheetRowNumber}`, values: [[STATUS_4]] });
//     }
//     if (Vendor_Name_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AM${sheetRowNumber}`, values: [[Vendor_Name_4]] });
//     }
//     if (BILL_NO_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AN${sheetRowNumber}`, values: [[BILL_NO_4]] });
//     }
//     if (BILL_DATE_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AO${sheetRowNumber}`, values: [[BILL_DATE_4]] });
//     }
//     if (BASIC_AMOUNT_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AP${sheetRowNumber}`, values: [[BASIC_AMOUNT_4]] });
//     }
//     if (CGST_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AQ${sheetRowNumber}`, values: [[CGST_4]] });
//     }
//     if (SGST_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AR${sheetRowNumber}`, values: [[SGST_4]] });
//     }
//     if (IGST_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AS${sheetRowNumber}`, values: [[IGST_4]] });
//     }
//     if (TOTAL_AMOUNT_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AT${sheetRowNumber}`, values: [[TOTAL_AMOUNT_4]] });
//     }
//     if (TRASNPORT_CHARGES_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AU${sheetRowNumber}`, values: [[TRASNPORT_CHARGES_4]] });
//     }
//     if (Transport_Gst_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AV${sheetRowNumber}`, values: [[Transport_Gst_4]] });
//     }
//     if (NET_AMOUNT_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AW${sheetRowNumber}`, values: [[NET_AMOUNT_4]] });
//     }
//     if (Remark_4 !== undefined) {
//       updates.push({ range: `Dimension_Office_Payment!AX${sheetRowNumber}`, values: [[Remark_4]] });
//     }

//     if (updates.length === 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: 'No fields provided to update',
//         },
//         { status: 400 }
//       );
//     }

//     // 3. Execute batch update
//     await sheets.spreadsheets.values.batchUpdate({
//       spreadsheetId: spreadsheetId,
//       resource: {
//         valueInputOption: 'USER_ENTERED',
//         data: updates,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Expense data updated successfully',
//       row: sheetRowNumber,
//       updatedFields: updates.map((u) => u.range),
//     });
//   } catch (error) {
//     console.error('Update error:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: 'Server error while updating sheet',
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }


// POST: /api/dim-expenses-entry
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      uid,
      STATUS_4,
      Vendor_Name_4,
      BILL_NO_4,
      BILL_DATE_4,
      BASIC_AMOUNT_4,
      CGST_4,
      SGST_4,
      IGST_4,
      TOTAL_AMOUNT_4,
      TRASNPORT_CHARGES_4,
      Transport_Gst_4,
      NET_AMOUNT_4,
      Remark_4,
    } = body;

    console.log('Received body:', body);

    if (!uid) {
      return NextResponse.json(
        { success: false, message: 'uid (Bill No) is required' },
        { status: 400 }
      );
    }

    const trimmedBillNo = String(uid).trim();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: 'Dimension_Office_Payment!B7:B',
    });

    const rows = response.data.values || [];

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'No data in sheet' }, { status: 404 });
    }

    // Sab matching rows collect karo
    const matchingRows = [];
    rows.forEach((row, index) => {
      if (row && row[0]) {
        const cellValue = String(row[0]).trim();
        if (cellValue === trimmedBillNo) {
          matchingRows.push({
            rowIndex: index,
            rowNumber: 7 + index,
          });
        }
      }
    });

    if (matchingRows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No matching Bill No found', searchedFor: trimmedBillNo },
        { status: 404 }
      );
    }

    // Last row
    const lastRow = matchingRows[matchingRows.length - 1];
    const lastRowNumber = lastRow.rowNumber;

    console.log(`Found ${matchingRows.length} matches → last row: ${lastRowNumber}`);

    const requests = [];

    // ───────────────────────────────────────────────
    // 1. SABHI matching rows mein STATUS_4 update kar do
    // ───────────────────────────────────────────────
    if (STATUS_4 !== undefined && STATUS_4 !== null && STATUS_4 !== '') {
      matchingRows.forEach(({ rowNumber }) => {
        requests.push({
          range: `Dimension_Office_Payment!AK${rowNumber}`,
          values: [[STATUS_4]],
        });
      });
    }

    // ───────────────────────────────────────────────
    // 2. Sirf LAST row mein baaki fields update kar do
    // ───────────────────────────────────────────────
    const addLastOnly = (colLetter, value) => {
      if (value !== undefined && value !== null && value !== '') {
        requests.push({
          range: `Dimension_Office_Payment!${colLetter}${lastRowNumber}`,
          values: [[value]],
        });
      }
    };

    addLastOnly('AM', Vendor_Name_4);
    addLastOnly('AN', BILL_NO_4);
    addLastOnly('AO', BILL_DATE_4);
    addLastOnly('AP', BASIC_AMOUNT_4);
    addLastOnly('AQ', CGST_4);
    addLastOnly('AR', SGST_4);
    addLastOnly('AS', IGST_4);
    addLastOnly('AT', TOTAL_AMOUNT_4);
    addLastOnly('AU', TRASNPORT_CHARGES_4);
    addLastOnly('AV', Transport_Gst_4);
    addLastOnly('AW', NET_AMOUNT_4);
    addLastOnly('AX', Remark_4);

    if (requests.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No fields to update' },
        { status: 400 }
      );
    }

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: spreadsheetId,
      resource: {
        valueInputOption: 'USER_ENTERED',
        data: requests,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Data updated: STATUS_4 sabhi rows mein, baaki sirf last row mein',
      updatedRows: matchingRows.length,
      lastRow: lastRowNumber,
      statusValueUsed: STATUS_4 || '(not provided)',
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}
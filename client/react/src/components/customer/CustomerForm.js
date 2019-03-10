import React from 'react';
import TextInput from '../common/TextInput';

const CustomerForm = ({ viewModel, onSave, onChange, saving, errors, onCancel }) => {
	return (
		<form>
			<TextInput
				name="name"
				label="Name"
				value={viewModel.entity.name}
				onChange={onChange}
				errors={errors} />

			<div className="button-grouping">
				<button
					disabled={saving}
					className="btn btn-primary btn-sm"
					onClick={onSave}>{saving ? 'Saving...' : 'Save'}</button>

				<button
					value="Cancel"
					className="btn btn-secondary btn-sm"
					onClick={onCancel}>Cancel</button>

			</div>

		</form>
	);
};

export default CustomerForm;